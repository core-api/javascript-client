import get from "./src"
import assert from 'chai';

describe('coreapi', function () {
    it("should work", function (done) {
        get("http://notes.coreapi.org/")
        .then(x => {
            console.log("Root fetch success!");
            return x.action('add_note', {"description": "Hello"})
        })
        .catch(x => {
            console.log("Creation failure!", x)
        })
        .then(doc => {
            console.dir("We created a note: ", doc);
            return doc.fields.get('notes')[0].action('delete');
        })
        .then(doc => {
            console.dir("Note deleted successfully");
            done();
        })
        .catch(_ => {
            console.log("Failed to delete note", _)
        });})

});

