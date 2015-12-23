import Immutable from "immutable";
import { transition } from "./transport";

const transition_types = ['follow', 'action', 'create', 'update', 'delete'];
const default_transition_type = 'follow';

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

        this.base_url = data.get('_meta').url;
        this.links = data.filter(x => x instanceof CoreLink);
        this._data = data;
        return this;
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

export class CoreArray {
    constructor(data) {
        data.forEach((x, i) => { this[parseInt(i)] = x });
        console.dir(this);
    }
}

export class CoreError {}

export class CoreLink {
    constructor (url, trans, fields, func) {
        if (typeof url !== 'undefined') {
            if (typeof url === 'string') {  
                this.url = url;
            }
            else {
                throw new TypeError("Argument 'url' must be a string");
            }
        }
        if (typeof trans !== 'undefined') {
            if (typeof trans !== 'string') {
                throw new TypeError("Argument 'trans' must be a string");
            }
            else if (transition_types.indexOf(trans) == -1) {
                throw new Error(`${trans} is not a valid transition type`);
            }
            else {
                this.trans = trans;
            }
        }
    }

    inspect () {
        return `{ ${this.trans}: ${this.url} }`
    }

    validate (parameters) {}

    transition (document, parameters) {
        this.validate(parameters);
        return transition(this.url, this.trans, parameters);
    }
}
