import Cookie from '../plugins/cookie.js';
import $ from "jquery";
const sign = require('jwt-encode');
const consola = require("consola");
const jspreadsheet = require("jspreadsheet-ce");

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
        'SEND_JWT' : 'send-jwt-for-verification',
        'USERS_LISTING' : 'users-listings'
    };

    Table = [];
    USERS_LIST = [];

    constructor(){
        this.isClientValid();
        this.getUsers();
        this.clickGetData();
    }

    /* --- Public Methods --- */

    isClientValid() {
        var bearer = Cookie.get('BR');
        var thisObj = this;

        if (typeof bearer === 'undefined') {
            thisObj.sendJwt();
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
            consola.success('Bearer issued');
        })
        .fail( function () { 
            consola.fatal('Bearer was not issued');
        })
        ;
    }

    getUsers() {
        var thisObj = this;
        var $url = thisObj._route('USERS_LISTING');

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
            thisObj.USERS_LIST = data;
            thisObj.initSpreadSheet();
        })
        .fail( function () { 
            console.log("fail");
        })
        ;
    }

    initSpreadSheet() {
        var thisObj = this;
        this.Table = jspreadsheet($('#spreadsheet').get(0), {
            data:thisObj.USERS_LIST.response,
            columns:[
                { 
                    type: 'text',
                    title:'Name',
                    width:100 
                },
                {
                    type: 'text',
                    title:'Surname',
                    width:100 
                },
                {
                    type: 'text',
                    title:'Email',
                    width:150 
                },
                {
                    type: 'calendar',
                    title:'Registered',
                    width:100 
                },
                {
                    type:'dropdown',
                    title:'QA',
                    width:75, 
                    source:['A','B','AB', 'BA','O']
                },
                {
                    type:'checkbox',
                    title:'Active', 
                    width:25
                },
                {
                    type: 'numeric', 
                    title: 'Net worth', 
                    width: 100, 
                    mask: '$ #.##,00', 
                    decimal: ',' 
                },
            ],
            minDimensions:[6,10],
            tableOverflow:true,
        });
    }

    clickGetData() {
        var thisObj = this;
        var $url = thisObj._route('USERS_LISTING');

        $(document).on('click', 'button#get-data', function(e) {
            e.preventDefault();
            thisObj.USERS_LIST = thisObj.Table.getJson();

            $.ajax({
                url     : $url,
                type    : 'POST',
                cache   : false,
                data    : {
                    'signature' : sign(thisObj._USER, thisObj._PK),
                    'users' : thisObj.USERS_LIST,
                },
                dataType    : 'json',
            })
            .done( function (data) {
                console.log('OK !');
            })
            .fail( function () { 
                console.log("insert / update failed !");
            })
            ;
        });
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