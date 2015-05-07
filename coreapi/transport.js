import * as Url from "url";
import selectCodec from "./codecs";

const methodMap = {
    'follow': 'GET',
    'action': 'POST',
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE'
};

class HTTPTransport {
    transition (url, t, parameters=false) {
        const method = methodMap[t];
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            let uri = url;
            let data = null;
            
            request.setRequestHeader('Accept', 'application/vnd.coreapi+json, application/json');
            request.onload(e => {
                let codec = selectCodec(request.getResponseHeader("Content-type"));
                resolve(codec.load(request.responseText));
            });
            request.onrerror(reject);

            if (parameters) {
                if (method === 'GET') {
                    let paramArray = Object.keys(parameters).map(key => `${key}=${parameters[key]}`);
                    let paramString = paramArray.reduce((acc, x) => `${acc}&${x}`);
                    uri = `${uri}?${paramString}`;
                }
                else {
                    data = JSON.encode(parameters);
                }
            }

            request.open(method, uri);
            request.send(data);
        });
    }
}

function getTransport(protocol) {
    return new HTTPTransport();
}

export function transition(url, t, parameters) {
    var urlComponents = Url.parse(url);

    var protocol = urlComponents.protocol;
    var hostname = urlComponents.hostname;

    var transport = getTransport(protocol);

    return transport.transition(url, t, parameters)
}
