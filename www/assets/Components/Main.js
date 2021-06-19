import Cookie from '../plugins/cookie.js';
import $ from "jquery";
const sign = require('jwt-encode');

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
    
    // Routes

    _ROUTES = {
        'REQUEST_JWT' : 'request-jwt',
        'SEND_JWT' : 'send-jwt-for-verification',
        'API_BEARER_JWT' : 'api-bearer-verification'
    };

    // Actions

    _ACTION = {
        'REQUEST_JWT' : '_requestJwt',
        'SEND_JWT' : '_sendJwt',
        'API_BEARER_JWT' : '_apiHandler',
    };

    constructor(){
        this.onClickEvents();
    }

    /* --- Public Methods --- */

    onClickEvents() {
        var thisObj = this;

        $(document).on('click', '#action-list a', function(e){
            e.preventDefault();
            var $action = thisObj._action(this);
            thisObj.[$action](); // Calling method dynamically
        });
    }

    /* --- Private Methods --- */

    _requestJwt() {
        var thisObj = this;
        var $url = thisObj._route('REQUEST_JWT');

        $.ajax({
            url     : $url,
            type    : 'POST',
            cache   : false,
            data    : {
                'request_access' : true,
            },
            dataType    : 'json',
            beforeSend	: function(){
                thisObj._OUTPUT.prepend('<div class="loader"></div>');
            }
        })
        .done( function (data, textStatus, jqXHR) { 
            thisObj._OUTPUT.find('.loader').remove();
            thisObj._OUTPUT.find('#api-response').html('<p>' + JSON.stringify(data) + '</p>');
        })
        .fail( function (jqXHR, textStatus, errorThrown) { 
            thisObj._OUTPUT.find('.loader').remove();
            thisObj._OUTPUT.find('#api-response').html('<p>' + JSON.stringify(errorThrown) + '</p>');
        })
        ;
    }

    _sendJwt() {
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
            beforeSend	: function(){
                thisObj._OUTPUT.prepend('<div class="loader"></div>');
            }
        })
        .done( function (data, textStatus, jqXHR) { 
            thisObj._OUTPUT.find('.loader').remove();
            thisObj._OUTPUT.find('#api-response').html('<p>' + JSON.stringify(data) + '</p>');
            Cookie.set('BR', data.bearer, {expires: 1});
        })
        .fail( function (jqXHR, textStatus, errorThrown) { 
            thisObj._OUTPUT.find('.loader').remove();
            thisObj._OUTPUT.find('#api-response').html('<p>' + JSON.stringify(errorThrown) + '</p>');
        })
        ;
    }

    _apiHandler() {
        var thisObj = this;
        var $url = thisObj._route('API_BEARER_JWT');

        $.ajax({
            url     : $url,
            type    : 'POST',
            cache   : false,
            data    : {
                'val' : 132,
            },
            headers : {
                'Authorization' : Cookie.get('BR'),
                // 'Access-Control-Allow-Origin' : '*',
                // 'Access-Control-Allow-Methods' : 'DELETE, POST, GET, OPTIONS',
                // 'Access-Control-Allow-Headers' : 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            },
            dataType    : 'json',
            beforeSend	: function(){
                thisObj._OUTPUT.prepend('<div class="loader"></div>');
            }
        })
        .done( function (data, textStatus, jqXHR) { 
            thisObj._OUTPUT.find('.loader').remove();
            thisObj._OUTPUT.find('#api-response').html('<p>' + JSON.stringify(data) + '</p>');
        })
        .fail( function (jqXHR, textStatus, errorThrown) { 
            thisObj._OUTPUT.find('.loader').remove();
            thisObj._OUTPUT.find('#api-response').html('<p>' + JSON.stringify(errorThrown) + '</p>');
        })
        ;
    }

    // Routes finder

    _route(name) {
        var thisObj = this;

        if ( !(name in thisObj._ROUTES) ) {
            alert('Route does not exist !');
            return;
        }

        return thisObj._SERVER_URL + thisObj._ROUTES[name];; 
    }

    // Action finder

    _action(Obj) {
        var thisObj = this;
        var $key = $(Obj).attr('id');

        if ( !($key in thisObj._ACTION) ) {
            alert('Action does not exist !');
            return;
        }

        return thisObj._ACTION[$key];; 
    }
}

export default Main;