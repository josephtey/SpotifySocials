const express = require('express')
const mongoose = require('mongoose')
const Match = mongoose.model('Match')

const router = express.Router()

router.post('/getmatches', async (req, res)=>{
    const { currentUser } = req.body
    
    Match.find({currentUser}, (err, matches) => {
        res.send(matches)
    })
})

router.post('/getusermatches', async (req, res)=>{
    const { currentUser, comparedUser } = req.body
    
    Match.find({currentUser, comparedUser}, (err, matches) => {
        matches.sort(function(a, b){
            return b.dateMatched-a.dateMatched
        })
        res.send(matches)
    })
})

router.post('/newmatch', async (req, res)=>{
    const { currentUser, comparedUser, compatibilityPercentage, dateMatched } = req.body
    try {
        const match = new Match({currentUser, comparedUser, compatibilityPercentage, dateMatched})
        await match.save()
        
        return res.send({message: "Success"})

    } catch (err) {
        console.log(err)
        return res.status(422).send(err.message)
    }
})

module.exports = router