const coreapi = require('../lib')

const client = new coreapi.Client()

client.get('http://www.mocky.io/v2/582c39880f0000ed0f7a149d')
  .then((data) => {
    console.log('Status: ', data)
  })
  .catch((error) => {
    console.log('Error: ', error)
  })
