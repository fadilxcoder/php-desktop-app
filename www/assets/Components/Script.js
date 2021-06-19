import $ from "jquery";
import Main from "./Main";

function init() {
    var filename = 'assets/token/api-public.pem';

    fetch(filename)
    .then((resp) => resp.text())
    .then(function(data) {
		localStorage.setItem('PUBLIC_KEY', data);
		initLogicHandler();
    });
}

function initLogicHandler() {
    $('#input-value').val(randomStringGenerator());
    new Main(); // Logic handler
}

function randomStringGenerator() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export {
    init,
}