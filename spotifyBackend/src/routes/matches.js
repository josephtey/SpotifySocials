const express = require('serverless-express/express')
const mongoose = require('mongoose')
const Match = mongoose.model('Match')
const User = mongoose.model('User')

const router = express.Router()

router.post('/getmatches', async (req, res) => {
    const { currentUser } = req.body

    Match.find({ currentUser }, (err, matches) => {
        res.send(matches)
    })
})

router.post('/getusermatches', async (req, res) => {
    const { currentUser, comparedUser } = req.body

    Match.find({ currentUser, comparedUser }, (err, matches) => {
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

router.post('/newmatch', async (req, res) => {
    const { currentUsername, otherUsername } = req.body
    try {
        // Get both users' data
        const currentUser = await User.findOne({ username: currentUsername }).lean().exec();
        const otherUser = await User.findOne({ username: otherUsername }).lean().exec();

        // Compare Current Genres
        const currentUserGenres = calculateGenreDistribution(currentUser.currentTopGenres, currentUser.currentTopArtists.length)
        const otherUserGenres = calculateGenreDistribution(otherUser.currentTopGenres, otherUser.currentTopArtists.length)

        let sameGenres = {}
        for (currentUserGenre in currentUserGenres) {
            for (otherUserGenre in otherUserGenres) {
                if (currentUserGenre === otherUserGenre) {
                    if (!sameGenres[currentUserGenre]) {
                        sameGenres[currentUserGenre] = {
                            "currentUser": currentUserGenres[currentUserGenre],
                            "otherUser": otherUserGenres[otherUserGenre]
                        }
                    }

                }
            }
        }

        let genreScore = 0;
        for (genre in sameGenres) {
            const indvGenreScore =
                (sameGenres[genre].currentUser + sameGenres[genre].otherUser)
                - Math.abs(sameGenres[genre].currentUser - sameGenres[genre].otherUser)

            genreScore += indvGenreScore
            sameGenres[genre].score = indvGenreScore
        }

        genreScore = clamp(normalise(genreScore, 0, 350) * 4, 0, 4)

        // Compare Current Artists
        const currentUserArtists = currentUser.currentTopArtists
        const otherUserArtists = otherUser.currentTopArtists

        let sameArtists = {}
        currentUserArtists.forEach((currentUserArtist, currentUserIndex) => {
            otherUserArtists.forEach((otherUserArtist, otherUserIndex) => {
                if (currentUserArtist.id === otherUserArtist.id) {
                    if (!sameArtists[currentUserArtist.id]) {
                        sameArtists[currentUserArtist.id] = {
                            artist: currentUserArtist.name,
                            currentUser: currentUserIndex,
                            otherUser: otherUserIndex
                        }
                    }
                }
            })
        })

        let artistScore = 0;
        for (artist in sameArtists) {
            const indvArtistScore =
                100 - ((sameArtists[artist].currentUser + sameArtists[artist].otherUser)
                    + Math.abs(sameArtists[artist].currentUser - sameArtists[artist].otherUser))

            artistScore += indvArtistScore
            sameArtists[artist].score = indvArtistScore
        }

        artistScore = normalise(artistScore, 0, 400) * 2

        // Compare Current Tracks 
        const currentUserTracks = currentUser.currentTopTracks
        const otherUserTracks = otherUser.currentTopTracks

        let sameTracks = {}
        currentUserTracks.forEach((currentUserTrack, currentUserIndex) => {
            otherUserTracks.forEach((otherUserTrack, otherUserIndex) => {
                if (currentUserTrack.id === otherUserTrack.id) {
                    if (!sameTracks[currentUserTrack.id]) {
                        sameTracks[currentUserTrack.id] = {
                            track: currentUserTrack.name,
                            currentUser: currentUserIndex,
                            otherUser: otherUserIndex
                        }
                    }
                }
            })
        })

        let trackScore = 0;
        for (track in sameTracks) {
            const indvTrackScore =
                100 - ((sameTracks[track].currentUser + sameTracks[track].otherUser)
                    + Math.abs(sameTracks[track].currentUser - sameTracks[track].otherUser))

            trackScore += indvTrackScore
            sameTracks[track].score = indvTrackScore
        }

        trackScore = normalise(trackScore, 0, 200) * 2

        // Compare Current Audio Features
        const currentUserAudioFeatures = currentUser.currentAudioFeatures
        const otherUserAudioFeatures = otherUser.currentAudioFeatures
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
        console.log(genreScore + artistScore + trackScore + audioFeatureScore)
        console.log(overallScore)

        // Write to Mongo
        const matchData = {
            currentUser: currentUsername,
            otherUser: otherUsername,
            dateMatched: new Date().getTime(),
            genreScore,
            trackScore,
            artistScore,
            audioFeatureScore,
            genreDetails: sameGenres,
            artistDetails: sameArtists,
            trackDetails: sameTracks,
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