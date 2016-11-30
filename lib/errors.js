class ParameterError extends Error {
  constructor (message) {
    super(message)
    this.message = message
    this.name = 'ParameterError'
  }
}

module.exports = {
  ParameterError: ParameterError
}
