import Cookie from '../plugins/cookie.js';
import $ from "jquery";

class Main
{
    // Constants

    _SERVER_URL = 'http://localhost/ci-jwt-api/api/';
    _OUTPUT = $('#api');
    _INPUT = $('#input-value').val();
    
    // Routes

    _ROUTES = {
        'REQUEST_JWT' : 'request-jwt',
        'SEND_JWT' : 'send-jwt',
    };

    // Actions

    _ACTION = {
        'REQUEST_JWT' : '_requestJwt',
        'SEND_JWT' : '_sendJwt',
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
            Cookie.set('jwt-encrypt-value', data.jwt);
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