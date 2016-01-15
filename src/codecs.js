import { CoreDocument, CoreLink, CoreArray, CoreObject, CoreError, CoreField } from './document';
import { List, Map } from 'immutable';
import * as Url from "url";

function escapeKey(key) {
    if (key.match(/_(type|meta)/)) {
        return '_' + key;
    }
    return key;
}

function unescapeKey(key) {
    if (key.match(/__(type|meta)/)) {
        return key.slice(2);
    }
    return key;
}

function nodeToPrimitive(node, base_url) {
    if (node instanceof CoreDocument) {
        function scopedNodeToPrimitive (x) {
            return nodeToPrimitive(x, base_url)
        }

        let ret = node.fields.map(scopedNodeToPrimitive)
            .merge(node.links.map(scopedNodeToPrimitive))
            .toJS();

        let meta = {};
        let url = base_url || node.base_url;
        if (typeof url !== 'undefined') {
            meta.url = url;
        }
        meta.title = node.title;

        ret._type = 'document';
        ret._meta = meta;
        return ret;
    }
    else if (node instanceof CoreLink) {
        let ret = {};
        ret._type = 'link';
        let url = gracefulRelativeUrl(base_url, node.url);
        if (typeof url !== 'undefined') {
            ret.url = url;
        }
        if (typeof node.trans !== 'undefined' &&
            node.trans !== DEFAULT_TRANSITION_TYPE) {
            ret.trans = node.trans;
        }
        if (node.fields instanceof Array) {
            ret.fields = Array.map(item => {
                if (item.required) {
                    return {
                        name: item.name,
                        required: item.required
                    };
                }
                else {
                    return item.name;
                }
            });
        }
        return ret;
    }
    else if (node instanceof CoreObject) {
        let ret = {};
        node.each((key, value) => {
            ret[escapeKey(key)] = nodeToPrimitive(value, base_url);
        });
        return ret;
    }
    else if (node instanceof CoreArray) {
        return Array.map(value => nodeToPrimitive(value, base_url), node);
    }
    else if (node instanceof CoreError) {

    }
}

function primitiveToNode(base_url, data) {
    // this walks the data, looking for subtrees with a _type key
    // and attempting to convert them to Link, Array, Document and Error.
    if (data instanceof Array) {
        let items = data.map(x => primitiveToNode(base_url, x));
        if (
            List(items).map(
                x => x.constructor && x.constructor.name || typeof x
            ).toSet().size > 1
        ) {
            throw new Error('An Array must be homogeneous');
        }
        return new CoreArray(items);
    }
    else if (data instanceof Object) {
        if (typeof data._type !== 'undefined') {
            // could be Link, Document or Error
            if (data._type === 'document') {
                let document_base = data._meta.url;
                let converted_data = new Map(data).map((value, key) => {
                    if (key[0] === '_') {
                        return value;
                    }
                    return primitiveToNode(Url.resolve(base_url, document_base), value);
                });
                return new CoreDocument(converted_data, base_url);
            }
            else if (data._type === 'link') {
                return new CoreLink(data.url || base_url, data.trans, data.fields)
            }
            else {
                throw new Error("no errors yet");
            }
        }
    }
    else {
        return data;
    }
}

class JSONCodec {
    load (body, base_url=undefined) {
        let data = JSON.parse(body);
        let doc = primitiveToNode(base_url, data);
        if (!(doc instanceof CoreDocument || doc instanceof CoreError)) {
            throw new Error('Top level node must be a document or error message.');
        }
        return doc;
    }

    dump (document) {

    }
}

export function selectCodec (mimeType) {
   return new JSONCodec();
}
