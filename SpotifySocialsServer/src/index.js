const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello")
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000")
})