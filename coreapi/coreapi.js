import transition from "./transport";

export function get (url) {
    return transition(url, 'follow');
}
