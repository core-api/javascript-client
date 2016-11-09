# Javascript client library

Javascript client library for [Core API][core-api].

[![build-status-image]][travis]
[![npm-version]][npm]

**In progress.**

[core-api]: https://github.com/core-api/core-api/
[build-status-image]: https://secure.travis-ci.org/core-api/javascript-client.svg?branch=master
[travis]: http://travis-ci.org/core-api/javascript-client?branch=master
[npm-version]: https://badge.fury.io/js/coreapi.svg
[npm]: http://badge.fury.io/js/coreapi


### Usage

##### Browser

The core js library is available on the unpkg cdn. Once loaded the library will be available on `window.coreapi`.

```html

<script src="https://unpkg.com/coreapi@latest/dist/coreapi.js"></script>

<script type="text/javascript">
    var coreapi = window.coreapi;
    var client = coreapi.client();

    client.get("http://httpbin.org/")
      .then(function (response) {
        var responseElement = document.getElementById("response");
        responseElement.innerText = response;
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
import coreapi from 'coreapi';

const client = coreapi.client();

client.get("http://httpbin.org/")
  .then((statusText) => {
    console.log("Status: ", statusText);
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
```
