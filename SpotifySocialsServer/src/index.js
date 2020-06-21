require('./models/User')
require('./models/Match')
require('./models/Relationship')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/users')
const matchRoutes = require('./routes/matches')
const relationshipRoutes = require('./routes/relationships')

const app = express()

app.use(bodyParser.json())
app.use(userRoutes)
app.use(matchRoutes)
app.use(relationshipRoutes)

const mongoUri = 'mongodb+srv://josephtey:joe123@cluster0-8gz6y.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', ()=>{
    console.log("Connected to Mongo instance! ")
});

mongoose.connection.on('error', (err)=>{
    console.log('Error connecting to mongo', err)
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})