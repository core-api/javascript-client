import Immutable from "immutable";
import { transition } from "./transport";

const transition_types = ['get', 'post', 'put', 'patch', 'delete'];
const default_transition_type = 'get';

function followLink (document, link, parameters={}) {
    return transition(link.url, link.trans, parameters=parameters);
}

export class CoreDocument {
    constructor (data, base_url) {
        if (data.get('_type') !== 'document') {
            console.error("document not!", JSON.stringify(data));
            throw new Error('Cannot initialize a document from data of another type');
        }

        this.title = data.get('_meta').title;
        delete data.title;

        this.base_url = base_url;
        this.links = data.filter(x => x instanceof CoreLink);
        let fields = {};
        data.filter(value => !(value instanceof CoreLink)).forEach((v, k) => {
            fields[k] = v;
        });
        this.fields = data.filter(value => !(value instanceof CoreLink));
        return this;
    }

    updateDescendants(descendant_url, replacement_document) {
        if (replacement_document === null) {
            this.removeDescendant(descendant_url);
        } else {
            this.replaceDescendant(descendant_url, replacement_document);
        }
    }

    removeDescendant(descendant_url) {
        this.fields = this.fields.filter((x) => (!x.base_url || x.base_url !== descendant_url));
        this.fields.forEach(function (field) {
            if (field.filter) {
                field.filter((x) => (!x.base_url || x.base_url !== descendant_url))
            }
        })
    }

    replaceDescendant(descendant_url, replacement_document) {
        this.fields = this.fields.map((x) => (x.base_url === descendant_url ? replacement_document : x));
    }

    action (action_name, parameters) {
        let link = this.links.get(action_name);
        if (!link) {
            throw new Error(action_name + ' is not a valid action');
        }
        console.info("Executing action " + action_name + " (url " + link.url + ") with parameters " + JSON.stringify(parameters));
        return link.transition(this, parameters);
    }
}

function removeDocumentFromIterable (descendant_url, iterable) {
    return iterable.filter(
        (x) => (!x.base_url || x.base_url !== descendant_url)
    ).map(function (field) {
        if (field.filter) {
            return removeDocumentFromIterable(descendant_url, field);
        } else {
            return field;
        }
    });
}

export class CoreArray {
    constructor(data) {
        data.forEach((x, i) => { this[parseInt(i)] = x });
    }
}

export class CoreError {}

export class CoreLink {
    constructor (url, action, fields) {
        if (typeof url !== 'undefined') {
            if (typeof url === 'string') {
                this.url = url;
            }
            else {
                throw new TypeError("Argument 'url' must be a string");
            }
        }
        if (typeof action !== 'undefined') {
            if (typeof action !== 'string') {
                throw new TypeError("Argument 'action' must be a string");
            }
            else if (transition_types.indexOf(action) == -1) {
                throw new Error(`${action} is not a valid transition type`);
            }
            else {
                this.trans = action;
            }
        }
        this.fields = fields;
        this.action = action;
    }

    inspect () {
        return `{ ${this.action}: ${this.url} }`
    }

    validate (parameters) {}

    transition (document, parameters) {
        this.validate(parameters);
        return transition(this.url, this.action, parameters);
    }
}
