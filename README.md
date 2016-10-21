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
  
```html
<script type="text/javascript">
    var coreapi = window.coreapi;
    var client = coreapi.client();

    client.get("http://httpbin.org/")
        .then(function (statusText) {
            var statusElement = document.getElementById("statusText");
            statusElement.innerText = statusText;
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
