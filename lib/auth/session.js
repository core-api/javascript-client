const utils = require('../utils')

function trim (str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
}

function getCookie (cookieName, cookieString) {
  cookieString = cookieString || window.document.cookie
  if (cookieString && cookieString !== '') {
    const cookies = cookieString.split(';')
    for (var i = 0; i < cookies.length; i++) {
      const cookie = trim(cookies[i])
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, cookieName.length + 1) === (cookieName + '=')) {
        return decodeURIComponent(cookie.substring(cookieName.length + 1))
      }
    }
  }
  return null
}

class SessionAuthentication {
  constructor (options = {}) {
    this.csrfToken = getCookie(options.csrfCookieName, options.cookieString)
    this.csrfHeaderName = options.csrfHeaderName
  }

  authenticate (options) {
    options.credentials = 'same-origin'
    if (this.csrfToken && !utils.csrfSafeMethod(options.method)) {
      options.headers[this.csrfHeaderName] = this.csrfToken
    }
    return options
  }
}

module.exports = {
  SessionAuthentication: SessionAuthentication
}
