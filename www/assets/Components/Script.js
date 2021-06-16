import $ from "jquery";
import Main from "./Main";

function init() {
    $('#input-value').val(randomStringGenerator());
    new Main(); // Logic handler
}

function randomStringGenerator() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export {
    init,
}