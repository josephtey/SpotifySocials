const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({
    currentUser: {
        type: String,
        unique: false,
        required: true
    },
    comparedUser: {
        type: String,
        unique: false,
        required: true
    },
    compatibilityPercentage: {
        type: Number, 
        unique: false,
        required: true
    },
    dateMatched: {
        type: Number, 
        unique: false,
        required: true
    }
})

mongoose.model('Match', matchSchema)

