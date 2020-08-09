const handler = require('serverless-express/handler')
const app = require('src/index')

// /Users/josephtey/Projects/SpotifySocials/spotifyBackend/src/index'
// src/index


module.exports.handler = handler(app)