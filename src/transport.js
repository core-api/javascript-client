import * as Url from "url";
import * as http from "http";
import { selectCodec } from "./codecs";

const methodMap = {
    'follow': 'GET',
    'action': 'POST',
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE'
};

class HTTPTransport {
    constructor() {
    }
    getHostname (url) {
        let urlComponents = Url.parse(url);
        return urlComponents.hostname;
    }
    getPort (url) {
        let urlComponents = Url.parse(url);
        return urlComponents.port;
    }
    getPath (method, url, parameters) {
        if (parameters && method === 'GET') {
            let paramArray = Object.keys(parameters).map(key => `${key}=${parameters[key]}`);
            let paramString = paramArray.reduce((acc, x) => `${acc}&${x}`);
            return `${url}?${paramString}`;
        }
        return url;
    }
    transition (url, t, parameters=false) {
        const method = methodMap[t];
        console.log("butts", method);
        let p = new Promise((resolve, reject) => {
            console.log("test");
            let hostname = this.getHostname(url);
            let port = this.getPort(url);
            let path = this.getPath(method, url);
            let data = null;
            console.log("test");
            let request = http.request(
                {
                    method: method,
                    hostname: hostname,
                    port: port,
                    path: path,
                    headers: {
                        'Accept': 'application/vnd.coreapi+json, application/json'   
                    }
                },
                response => {
                    let content_type = response.headers["content-type"];
                    console.log("response received", content_type);
                    let codec = selectCodec(content_type);
                    let data = '';
                    response.on('data', chunk => { data += chunk; });
                    response.on('end', _ => {
                        resolve(codec.load(data));
                    });
                }
            );

            console.log("done creating request");
            
            request.on('error', reject);

            if (parameters && method !== 'GET') {
                request.write(JSON.encode(parameters));
            }
            console.log("boots");

            request.end();
        });
        p.then((x) => { console.log("fulfilled", x); });
        return p;
    }
}

function getTransport(protocol) {
    return new HTTPTransport();
}

export function transition(url, t, parameters) {
    let urlComponents = Url.parse(url);

    let protocol = urlComponents.protocol;
    let hostname = urlComponents.hostname;

    let transport = getTransport(protocol);

    return transport.transition(url, t, parameters);
}
