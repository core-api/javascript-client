# Javascript client library

Javascript client library for [Core API][core-api].

[![build-status-image]][travis]
[![npm-version]][npm]

**In progress.**

# Usage

## Installation

1. Install with npm
  ```shell
  npm install coreapi
  # Add --save to add to your package.json
  ```

## Node

1. Import the Document class with
  ```javascript
  var Document = require('coreapi').Document;
  ```

1. Create a new document with
  ```javascript
  var note = new Document('Note', 'http://example.com/note', {text: 'This is awesome!'});
  ```

1. Now you can log the document you've created
  ```javascript
  note
  /* Outputs:
  { title: 'Note',
    url: 'http://example.com/note',
    get: [Function],
    toString: [Function] }
  */
  ```

  ```javascript
  console.log(note.toString());
  /* Outputs:
  <Note http://example.com/note>
      text: This is awesome!
  */
  ```


[core-api]: https://github.com/core-api/core-api/
[build-status-image]: https://secure.travis-ci.org/core-api/javascript-client.svg?branch=master
[travis]: http://travis-ci.org/core-api/javascript-client?branch=master
[npm-version]: https://badge.fury.io/js/coreapi.svg
[npm]: http://badge.fury.io/js/coreapi
