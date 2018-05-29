class BasicAuthentication {
  constructor (options = {}) {
    const username = options.username
    const password = options.password
    const hash = window.btoa(username + ':' + password)
    this.auth = 'Basic ' + hash
  }

  authenticate (options) {
    options.headers['Authorization'] = this.auth
    return options
  }
}

module.exports = {
  BasicAuthentication: BasicAuthentication
}
