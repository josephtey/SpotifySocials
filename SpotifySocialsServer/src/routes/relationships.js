const express = require('express')
const mongoose = require('mongoose')
const Relationship = mongoose.model('Relationship')
const User = mongoose.model('User')

const router = express.Router()

router.post('/addfriend', async (req, res)=>{
    const { currentUser, otherUser } = req.body
    try {
        // Check if friendship already exists
        const friendship = await Relationship.findOne().or([{ currentUser, otherUser }, { currentUser: otherUser, otherUser: currentUser }])
        
        if (!friendship) {
            // Create new DB instance 
            const newFriendship = new Relationship({currentUser, otherUser, type: 'pending'})
            await newFriendship.save()

            res.send({message: "Success"})
        } else {
            res.send({message: "Friendship already exists!"})
        }
        
        
    } catch (err) {
        res.send(err)
    }
    
})

router.post('/acceptfriend', async (req, res)=>{
    // Current User is the person who SENT the friend request
    const { currentUser, otherUser } = req.body

    try {
        // Update to friends status
        await Relationship.findOneAndUpdate({currentUser, otherUser}, {type:'friends'})
        res.send({message: "Success"})

    } catch (err) {
        res.send(err)
    }
})

router.post('/rejectfriend', async (req, res)=>{
    // Current User is the person who SENT the friend request
    const { currentUser, otherUser } = req.body

    try {
        // Update to friends status
        await Relationship.findOneAndDelete({currentUser, otherUser})
        res.send({message: "Success"})

    } catch (err) {
        res.send(err)
    }
})

router.post('/getfriends', async (req, res)=>{
    const { currentUser } = req.body    

    Relationship.find({type: 'friends'}).or([{ currentUser }, { otherUser:currentUser }])
    .then(async users => { 
        let modifiedUsers = []
        let user

        for (let i = 0; i < users.length; i ++) {
            if (users[i].currentUser === currentUser){
                user = await User.findOne({username: users[i].otherUser}, 'username spotifyId displayName')
            } else {
                user = await User.findOne({username: users[i].currentUser}, 'username spotifyId displayName')
            }

            if (!user) {
                return res.send({message: "Failed"})
            }

            modifiedUsers.push(user)
        }

        res.send(modifiedUsers)
     })
    .catch(error => { res.send(error) })
})

router.post('/getfriendrequests', async (req, res)=>{

    // Other user is the user who receives the friend request
    const { otherUser } = req.body    

    Relationship.find({type: 'pending', otherUser}, function(err, requests){
        if (err) {
            res.send(err)
        } else {
            res.send(requests)
        }
    })
})





module.exports = router