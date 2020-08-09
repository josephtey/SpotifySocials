const express = require('serverless-express/express')
const mongoose = require('mongoose')
const Match = mongoose.model('Match')
const User = mongoose.model('User')

const router = express.Router()

router.post('/getAllMatches', async (req, res) => {
    const { currentUser } = req.body

    Match.find({ currentUser }, (err, matches) => {
        res.send(matches)
    })
})

router.post('/getSpecificMatches', async (req, res) => {
    const { currentUser, otherUser } = req.body

    Match.find({ currentUser, otherUser }, (err, matches) => {
        matches.sort(function (a, b) {
            return b.dateMatched - a.dateMatched
        })
        res.send(matches)
    })
})

function calculateGenreDistribution(genreCount, songCount) {

    // Get distribution
    let genreDistribution = {}
    for (genre in genreCount) {
        genreDistribution[genre] = (genreCount[genre] / songCount) * 100
    }

    return genreDistribution
}

function normalise(value, min, max) {
    return ((value - min) / (max - min))
}

function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}

function cosinesim(A, B) {
    var dotproduct = 0;
    var mA = 0;
    var mB = 0;
    for (i = 0; i < A.length; i++) { // here you missed the i++
        dotproduct += (A[i] * B[i]);
        mA += (A[i] * A[i]);
        mB += (B[i] * B[i]);
    }
    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = (dotproduct) / ((mA) * (mB)) // here you needed extra brackets
    return similarity;
}

router.post('/newMatch', async (req, res) => {
    const { currentUser, otherUser } = req.body
    try {
        // Get both users' data
        const currentUserData = await User.findOne({ username: currentUser }).lean().exec();
        const otherUserData = await User.findOne({ username: otherUser }).lean().exec();

        // Compare Current Genres
        const currentUserGenres = calculateGenreDistribution(currentUserData.currentTopGenres, currentUserData.currentTopArtists.length)
        const otherUserGenres = calculateGenreDistribution(otherUserData.currentTopGenres, otherUserData.currentTopArtists.length)

        let genreDetail = [], genreScore = 0;
        for (currentUserGenre in currentUserGenres) {
            for (otherUserGenre in otherUserGenres) {
                if (currentUserGenre === otherUserGenre) {
                    const indvGenreScore =
                        (currentUserGenres[currentUserGenre] + otherUserGenres[otherUserGenre])
                        - Math.abs(currentUserGenres[currentUserGenre] - otherUserGenres[otherUserGenre])

                    const genre = {
                        "genre": currentUserGenre,
                        "currentUser": currentUserGenres[currentUserGenre],
                        "otherUser": otherUserGenres[otherUserGenre],
                        "score": indvGenreScore
                    }

                    if (!genreDetail.includes(genre)) {
                        genreDetail.push(genre)
                        genreScore += indvGenreScore
                    }

                }
            }
        }

        genreScore = clamp(normalise(genreScore, 0, 350) * 4, 0, 4)
        genreDetail = genreDetail.sort(function (a, b) {
            return b.score - a.score
        })

        // Compare Current Artists
        const currentUserArtists = currentUserData.currentTopArtists
        const otherUserArtists = otherUserData.currentTopArtists

        let artistDetails = [], artistScore = 0;
        currentUserArtists.forEach((currentUserArtist, currentUserIndex) => {
            otherUserArtists.forEach((otherUserArtist, otherUserIndex) => {
                if (currentUserArtist.id === otherUserArtist.id) {
                    const indvArtistScore =
                        100 - ((currentUserIndex + otherUserIndex)
                            + Math.abs(currentUserIndex - otherUserIndex))

                    const artist = {
                        "id": currentUserArtist.id,
                        "name": currentUserArtist.name,
                        "currentUser": currentUserIndex,
                        "otherUser": otherUserIndex,
                        "score": indvArtistScore
                    }

                    if (!artistDetails.includes(artist)) {
                        artistDetails.push(artist)
                        artistScore += indvArtistScore
                    }
                }
            })
        })

        artistScore = normalise(artistScore, 0, 400) * 2
        artistDetails = artistDetails.sort(function (a, b) {
            return b.score - a.score
        })

        // Compare Current Tracks 
        const currentUserTracks = currentUserData.currentTopTracks
        const otherUserTracks = otherUserData.currentTopTracks

        let trackDetails = [], trackScore = 0;
        currentUserTracks.forEach((currentUserTrack, currentUserIndex) => {
            otherUserTracks.forEach((otherUserTrack, otherUserIndex) => {
                if (currentUserTrack.id === otherUserTrack.id) {
                    const indvTrackScore =
                        100 - ((currentUserIndex + otherUserIndex)
                            + Math.abs(currentUserIndex - otherUserIndex))

                    const track = {
                        "id": currentUserTrack.id,
                        "name": currentUserTrack.name,
                        "currentUser": currentUserIndex,
                        "otherUser": otherUserIndex,
                        "score": indvTrackScore
                    }

                    if (!trackDetails.includes(track)) {
                        trackDetails.push(track)
                        trackScore += indvTrackScore
                    }
                }
            })
        })

        trackScore = normalise(trackScore, 0, 200) * 2
        trackDetails = trackDetails.sort(function (a, b) {
            return b.score - a.score
        })

        // Compare Current Audio Features
        const currentUserAudioFeatures = currentUserData.currentAudioFeatures
        const otherUserAudioFeatures = otherUserData.currentAudioFeatures
        const featuresToCompare = {
            "danceability": [0, 1],
            "energy": [0, 1],
            "loudness": [-60, 0],
            "speechiness": [0, 1],
            "acousticness": [0, 1],
            "liveness": [0, 1],
            "valence": [0, 1],
            "tempo": [0, 150],
            "instrumentalness": [0, 1]
        }

        let normalisedCurrentUserAudioFeatures = []
        let normalisedOtherUserAudioFeatures = []

        for (feature in featuresToCompare) {
            normalisedCurrentUserAudioFeatures.push(normalise(currentUserAudioFeatures[feature], featuresToCompare[feature][0], featuresToCompare[feature][1]))
            normalisedOtherUserAudioFeatures.push(normalise(otherUserAudioFeatures[feature], featuresToCompare[feature][0], featuresToCompare[feature][1]))
        }
        let rawAudioFeatureScore = cosinesim(normalisedCurrentUserAudioFeatures, normalisedOtherUserAudioFeatures)
        let audioFeatureScore = clamp(normalise(rawAudioFeatureScore, 0.5, 1), 0, 1)

        // Final Calculation
        const overallScore = (1 / (1 + Math.pow(Math.E, -((genreScore + artistScore + trackScore + audioFeatureScore) - 4)))) * 100

        // Write to Mongo
        const matchData = {
            currentUser: currentUser,
            otherUser: otherUser,
            dateMatched: new Date().getTime(),
            genreScore,
            trackScore,
            artistScore,
            audioFeatureScore,
            genreDetails: genreDetail,
            artistDetails: artistDetails,
            trackDetails: trackDetails,
            overallScore: overallScore
        }

        const newMatch = new Match(matchData)
        await newMatch.save()

        return res.send({ message: "Success" })

    } catch (err) {
        console.log(err)
        return res.status(422).send(err.message)
    }
})
module.exports = router