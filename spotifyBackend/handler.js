const handler = require('serverless-express/handler')
const app = require('src/index')

module.exports.handler = handler(app)