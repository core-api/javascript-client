class TokenAuthentication {
  constructor (options = {}) {
    this.token = options.token
    this.prefix = options.prefix || 'Bearer'
  }

  authenticate (options) {
    options.headers['Authorization'] = this.prefix + ' ' + this.token
    return options
  }
}

module.exports = {
  TokenAuthentication: TokenAuthentication
}
