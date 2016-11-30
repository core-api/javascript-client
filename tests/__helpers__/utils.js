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

const echoUrl = function (url) {
  return new Promise((resolve, reject) => {
    const textPromise = () => {
      return new Promise((resolve, reject) => {
        process.nextTick(
          resolve(`{"url": "${url}"}`)
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
  mockedFetch: mockedFetch,
  echoUrl: echoUrl
}
