const basic = require('./basic')
const session = require('./session')
const token = require('./token')

module.exports = {
  BasicAuthentication: basic.BasicAuthentication,
  SessionAuthentication: session.SessionAuthentication,
  TokenAuthentication: token.TokenAuthentication
}
