# Javascript client library

Javascript client library for [Core API][core-api].

[![travis-image]][travis-url]
[![npm-image]][npm-url]
[![codecov-image]][codecov-url]]

**In progress.**

### Usage

##### Browser

The core js library is available on the unpkg cdn. Once loaded the library will be available on `window.coreapi`.

```html

<script src="https://unpkg.com/coreapi@latest/dist/coreapi.js"></script>

<script type="text/javascript">
    var coreapi = window.coreapi;
    var client = new coreapi.Client();

    client.get("http://httpbin.org/")
      .then(function (data) {
        var responseElement = document.getElementById("response");
        responseElement.innerText = data;
      })
      .catch(function (error) {
        console.log("ERROR: ", error);
      });
</script>
```

##### Node

Install it with NPM or add it to your package.json:

    $ npm install coreapi


```javascript    
const coreapi = require('coreapi');

const client = new coreapi.Client()

client.get("http://httpbin.org/")
  .then((data) => {
    console.log("Status: ", data);
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
```


### Tests

To run the tests (linting & unit tests):

    npm test

[core-api]: https://github.com/core-api/core-api/
[travis-image]: https://secure.travis-ci.org/core-api/javascript-client.svg?branch=master
[travis-url]: http://travis-ci.org/core-api/javascript-client?branch=master
[npm-image]: https://badge.fury.io/js/coreapi.svg
[npm-url]: http://badge.fury.io/js/coreapi
[codecov-image]: https://codecov.io/gh/core-api/javascript-client/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/core-api/javascript-client
