class MockedFormData {
  constructor () {
    this.params = []
  }

  append (key, value) {
    this.params.push([key, value])
  }
}

const mockedFetch = function (responseBody, contentType, statusCode = 200) {
  return (url) => {
    return new Promise((resolve, reject) => {
      const textPromise = () => {
        return new Promise((resolve, reject) => {
          process.nextTick(
            resolve(responseBody)
          )
        })
      }

      process.nextTick(
        resolve({
          url: url,
          status: statusCode,
          statusText: statusCode === 200 ? 'OK' : 'BAD REQUEST',
          ok: statusCode === 200,
          headers: {
            get (header) {
              return contentType
            }
          },
          text: textPromise
        })
      )
    })
  }
}

const echo = function (url, options = {}) {
  const method = options.method
  const headers = options.headers
  const body = options.body

  return new Promise((resolve, reject) => {
    const textPromise = () => {
      return new Promise((resolve, reject) => {
        let result
        if (body instanceof MockedFormData) {
          result = JSON.stringify({url: url, method: method, headers: headers, form: body.params})
        } else if (body) {
          result = JSON.stringify({url: url, method: method, headers: headers, body: body})
        } else {
          result = JSON.stringify({url: url, method: method, headers: headers})
        }
        process.nextTick(
          resolve(result)
        )
      })
    }

    process.nextTick(
      resolve({
        url: url,
        status: 200,
        statusText: 'OK',
        ok: true,
        headers: {
          get (header) {
            return 'application/json'
          }
        },
        text: textPromise
      })
    )
  })
}

module.exports = {
  MockedFormData: MockedFormData,
  mockedFetch: mockedFetch,
  echo: echo
}
