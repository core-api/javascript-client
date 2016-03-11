# Javascript client library

Javascript client library for [Core API][core-api].

[![build-status-image]][travis]
[![npm-version]][npm]

## Getting Started
### Installation
    npm install coreapi-promise
### Working with the API
The default export from `coreapi-promise` is `get`, a function taking one argument, a URL, and returning a Promise which is resolved with a Document.

You can retrieve the starting point of an API,

    get('http://notes.coreapi.org')

following up with an operation on the document when the Promise is resolved

    .then(document => document.action('add_note', {'description': 'Test note, please ignore'}))

and storing the result of that operation

    .then(document => { store.set('notes', document.notes) });

[core-api]: https://github.com/weargoggles/coreapi-promise/
[build-status-image]: https://secure.travis-ci.org/weargoggles/coreapi-promise.svg?branch=master
[travis]: http://travis-ci.org/weargoggles/coreapi-promise?branch=master
[npm-version]: https://badge.fury.io/js/coreapi-promise.svg
[npm]: http://badge.fury.io/js/coreapi-promise
