const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    displayName: {
        type: String,
        unique: false,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    spotifyId: {
        type: String,
        unique: true,
        required: true
    },
    currentTopArtists: {
        type: Map,
        required: true
    },
    currentTopTracks: {
        type: Map,
        required: true
    },
    currentTopGenres: {
        type: Map,
        required: true
    },
    currentAudioFeatures: {
        type: Map,
        required: true
    },
    allTimeTopArtists: {
        type: Map,
        required: true
    },
    allTimeTopTracks: {
        type: Map,
        required: true
    },
    allTimeTopGenres: {
        type: Map,
        required: true
    },
    allTimeAudioFeatures: {
        type: Map,
        required: true
    }
})

mongoose.model('User', userSchema)

