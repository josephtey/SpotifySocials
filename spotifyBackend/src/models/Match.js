const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({
    currentUser: {
        type: String,
        unique: false,
        required: true
    },
    otherUser: {
        type: String,
        unique: false,
        required: true
    },
    dateMatched: {
        type: Number,
        unique: false,
        required: true
    },
    genreScore: {
        type: Number,
        unique: false,
        required: true
    },
    trackScore: {
        type: Number,
        unique: false,
        required: true
    },
    artistScore: {
        type: Number,
        unique: false,
        required: true
    },
    audioFeatureScore: {
        type: Number,
        unique: false,
        required: true
    },
    genreDetails: {
        type: Array,
        unique: false,
        required: true
    },
    artistDetails: {
        type: Array,
        unique: false,
        required: true
    },
    trackDetails: {
        type: Array,
        unique: false,
        required: true
    },
    overallScore: {
        type: Number,
        unique: false,
        required: true
    }
})

mongoose.model('Match', matchSchema)

