const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const router = express.Router()

router.post('/userexists', async (req, res) => {
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

router.post('/inituser', async (req, res) => {
    const userData = req.body
    try {
        const user = new User(userData)
        await user.save()

        return res.send({ message: "Success" })

    } catch (err) {
        console.log(err)
        return res.status(422).send(err.message)
    }

})

router.post('/searchusers', (req, res) => {
    const { username } = req.body

    User.find({ username: { $regex: "(?i)^" + username } }, 'spotifyId username displayName', (err, users) => {
        console.log(users)
        res.send(users)
    })
})

router.post('/user', async (req, res) => {
    const { spotifyId } = req.body
    let user = await User.findOne({ spotifyId })

    res.send(user)
})


module.exports = router