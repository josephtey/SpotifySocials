const express = require('serverless-express/express')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const router = express.Router()

router.post('/userExists', async (req, res) => {
    const { spotifyId } = req.body
    try {
        const user = await User.findOne({ spotifyId })
        if (!user) {
            return res.send({ result: false })
        } else {
            return res.send({ result: true })
        }
    } catch (err) {
        return res.status(422).send(err.message)
    }

})

router.post('/initialiseUser', async (req, res) => {
    const userData = req.body
    try {
        const user = await User.findOne({ spotifyId: userData.spotifyId })

        if (user) {
            const updatedUser = await User.findOneAndUpdate({ spotifyId: userData.spotifyId }, userData)
        } else {
            const newUser = new User(userData)
            await newUser.save()
        }

        console.log("SUCCEEDED!!")
        console.log(userData)

        return res.send({ message: "Success" })

    } catch (err) {
        console.log("ERROR ENCOUNTERED: ")
        console.log(err)
        return res.status(422).send({ message: "Error" })
    }

})

router.post('/searchUsers', async (req, res) => {
    const { username } = req.body

    try {
        const users = await User.find({ username: { $regex: "(?i)^" + username } }, 'spotifyId username displayName recentObscurifyPercentile currentAudioFeatures')
        res.send(users)

    } catch (err) {
        res.send(err)
    }
})

router.post('/getUser', async (req, res) => {
    const { spotifyId } = req.body
    let user = await User.findOne({ spotifyId })

    res.send(user)
})

module.exports = router