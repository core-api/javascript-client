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

class ErrorMessage extends Error {
  constructor (message, content) {
    super(message)
    this.message = message
    this.content = content
    this.name = 'ErrorMessage'
  }
}

module.exports = {
  ParameterError: ParameterError,
  LinkLookupError: LinkLookupError,
  ErrorMessage: ErrorMessage
}
