import Immutable from "immutable";
import { transition } from "./transport";

const transition_types = ['follow', 'action', 'create', 'update', 'delete'];
const default_transition_type = 'follow';

function followLink (document, link, parameters={}) {
    return transition(link.url, link.trans, parameters=parameters);
}

function toCore (value) {
    if (value instanceof Array) {
        return CoreArray.fromJS(value);
    }
    else if (value instanceof Object) {
        return CoreObject.fromJS(value);
    }
    else {}
}

export class CoreDocument {
    constructor (data, base_url) {
        super(data);
        if (data._type !== 'document') {
            throw new Error('Cannot initialize a document from data of another type');
        }
        
        this.title = data.title;
        delete data.title;

        this.base_url = base_url;
        this._data = Immutable.Map(data);
        return this;
    }
}

export class CoreArray {}

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
}
