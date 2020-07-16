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
    topGenres: {
        type: String, 
        required: true
    },
    topArtists: {
        type: String, 
        required: true
    },
    topTracks: {
        type: String, 
        required: true
    }
})

mongoose.model('User', userSchema)

