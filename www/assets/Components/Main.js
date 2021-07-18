import Cookie from '../plugins/cookie.js';
import $ from "jquery";
const sign = require('jwt-encode');
const consola = require("consola");

class Main
{
    // Constants

    _PK = localStorage.getItem('PUBLIC_KEY')
    _SERVER_URL = 'http://localhost/ci-jwt-api/api/';
    _OUTPUT = $('#api');
    _INPUT = $('#input-value').val();
    _USER = {
        'id' : 0,
        'uname' : 'api@client.authorize',
        'role' : 'anonymous'
    };
    _IS_BEARER_PRESENT= false;
    
    // Routes

    _ROUTES = {
        'REQUEST_JWT' : 'request-jwt',
        'SEND_JWT' : 'send-jwt-for-verification',
        'API_BEARER_JWT' : 'api-bearer-verification'
    };

    constructor(){
        this.isClientValid();
        this.apiHandler();
    }

    /* --- Public Methods --- */

    isClientValid() {
        var bearer = Cookie.get('BR');
        var thisObj = this;

        if (typeof bearer === 'undefined') {
            thisObj.sendJwt();
        } else {
            thisObj._IS_BEARER_PRESENT = true;
        }
    }

    sendJwt() {
        var thisObj = this;
        var $url = thisObj._route('SEND_JWT');

        $.ajax({
            url     : $url,
            type    : 'POST',
            cache   : false,
            data    : {
                'signature' : sign(thisObj._USER, thisObj._PK),
            },
            dataType    : 'json',
        })
        .done( function (data) {
            Cookie.set('BR', data.bearer, {expires: 1});
            thisObj._IS_BEARER_PRESENT = true;
            consola.success('Bearer issued');
            location.reload(true);
        })
        .fail( function () { 
            consola.fatal('Bearer was not issued');
        })
        ;
    }

    apiHandler() {
        var thisObj = this;

        if (thisObj._IS_BEARER_PRESENT === false) {
            return;
        }

        var $url = thisObj._route('API_BEARER_JWT');

        $.ajax({
            url     : $url,
            type    : 'POST',
            cache   : false,
            headers : {
                'Authorization' : Cookie.get('BR'),
            },
            dataType    : 'json',
        })
        .done( function (data) { 
            thisObj._OUTPUT.find('#api-response').html('<p>' + JSON.stringify(data) + '</p>');
            consola.success('Valid Authorization Bearer ');
        })
        .fail( function () { 
            consola.fatal('Invalid Authorization Bearer !');
        })
        ;
    }

    /* --- Private Methods --- */

    // Routes finder

    _route(name) {
        var thisObj = this;

        if ( !(name in thisObj._ROUTES) ) {
            alert('Route does not exist !');
            return;
        }

        return thisObj._SERVER_URL + thisObj._ROUTES[name];; 
    }
}

export default Main;