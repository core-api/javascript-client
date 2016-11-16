const mockedFetch = (url) => {
  return new Promise((resolve, reject) => {
    const textPromise = () => {
      return new Promise((resolve, reject) => {
        process.nextTick(
          resolve('YEAAAH')
        )
      })
    }

    process.nextTick(
      resolve({
        status: 123,
        statusText: 'Nice!',
        ok: true,
        headers: {
          get (header) {
            return 'text/html'
          }
        },
        text: textPromise
      })
    )
  })
}

module.exports = {
  mockedFetch: mockedFetch
}
