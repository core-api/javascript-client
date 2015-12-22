import { CoreDocument, CoreLink, CoreArray, CoreObject, CoreError, CoreField } from './document';

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
            ret[escapeKey(key)] = documentToPrimitive(value, base_url);
        });
        return ret;
    }
    else if (node instanceof CoreArray) {
        return Array.map(value => documentToPrimitive(value, base_url), node);
    }
    else if (node instanceof CoreError) {

    }
}

function primitiveToNode(base_url, data) {
    // this walks the data, looking for subtrees with a _type key
    // and attempting to convert them to Link, Array, Document and Error.
    if (data instanceof Array) {
        let items = data.map(x => primitiveToDocument(base_url, x));
        if (!items.map(x => x.prototype).reduce(
            (previous, current) => {
                if (typeof previous === 'undefined') {
                    /*
                     * a single-element array is homogeneous; the prototype of 
                     * the first element is sufficiently truthy
                     */
                    return current;
                }
                else {
                    return previous === current;
                }
            },
            {} // an empty array is homogeneous
        )) {
            throw new Error('An Array must be homogeneous');
        }
        return CoreArray(data);
    }
    else if (data instanceof Object) {
        if (typeof data._type !== 'undefined') {
            // could be Link, Document or Error
        }
    }
    else {}
    data.keys().forEach(x => {});
    return new CoreDocument(data, base_url);    
}

class JSONCodec {
    load (body, base_url=undefined) {
        let data = JSON.parse(body);
        let doc = primitiveToDocument(data, base_url);
        if (!(doc instanceof CoreDocument || doc instanceof CoreError)) {
            throw new Error('Top level node must be a document or error message.');
        }
        return doc;
    }
}

export function selectCodec (mimeType) {
   return new JSONCodec();
}
