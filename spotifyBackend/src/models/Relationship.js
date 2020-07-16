const mongoose = require('mongoose')

const relationshipSchema = new mongoose.Schema({
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
    type: {
        type: String, 
        unique: false,
        required: true
    }
})

mongoose.model('Relationship', relationshipSchema)

