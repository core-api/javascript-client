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

module.exports = {
  mockedFetch: mockedFetch
}
