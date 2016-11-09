const expect = require('expect');
const coreapi = require('../lib/index');

const client = coreapi.client();

const textUrl = 'http://www.mocky.io/v2/582321ea1000008610ccfea6';
const jsonUrl = 'http://www.mocky.io/v2/582321ba1000006310ccfea5';

client.get(textUrl)
  .then((data) => {
    expect(typeof data).toEqual('string');
    expect(data).toEqual('<h1>Hello World!</h1>');
    console.log('Get (Text Url): Passed ✔︎');
  })
  .catch((error) => {
    expect(error).toNotExist();
  });

client.get(jsonUrl)
  .then((data) => {
    expect(typeof data).toEqual('object');
    expect(data).toEqual({"text": "hello"});
    console.log('Get (JSON Url): Passed ✔︎');
  })
  .catch((error) => {
    expect(error).toNotExist();
  });

expect(client.decoders[0].decode("Hello").text).toEqual("Hello");
console.log('Decoders: Passed ✔︎');

expect(client.decoders[0].decode("Hello")).toEqual(new coreapi.Document("Hello"));
console.log('Document: Passed ✔︎');
