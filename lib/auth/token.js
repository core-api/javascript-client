class TokenAuthentication {
  constructor (options = {}) {
    this.token = options.token
    this.scheme = options.scheme || 'Bearer'
  }

  authenticate (options) {
    options.headers['Authorization'] = this.scheme + ' ' + this.token
    return options
  }
}

module.exports = {
  TokenAuthentication: TokenAuthentication
}
