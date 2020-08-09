const handler = require('serverless-express/handler')
const app = require('/Users/josephtey/Projects/SpotifySocials/spotifyBackend/src/index')

module.exports.handler = handler(app)