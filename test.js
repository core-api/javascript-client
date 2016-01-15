import { get } from "./src/core-api"


get("http://localhost:3000/")
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
    })
    .catch(_ => {
        console.log("Failed to delete note", _)
    });

