import "babel/polyfill";
import { transition } from "./transport";
import {CoreArray, CoreDocument} from './document';

export default function get (url) {
    return transition(url, 'follow');
}

export {CoreArray, CoreDocument};
