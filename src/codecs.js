import { CoreDocument, CoreLink, CoreArray, CoreObject, CoreError, CoreField } from './document';

class FooCodec {
    load (body) {
        return body;
    }
}

export function selectCodec (mimeType) {
   return new FooCodec();
}
