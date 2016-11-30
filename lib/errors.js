class ParameterError extends Error {
  constructor (message) {
    super(message)
    this.message = message
    this.name = 'ParameterError'
  }
}

class LinkLookupError extends Error {
  constructor (message) {
    super(message)
    this.message = message
    this.name = 'LinkLookupError'
  }
}

module.exports = {
  ParameterError: ParameterError,
  LinkLookupError: LinkLookupError
}
