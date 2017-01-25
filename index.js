'use strict';

module.change_code = 1;

var _ = require('lodash');

var Alexa = require('alexa-app');

var app = new Alexa.app('airportinfo');

var FAADataHelper = require('./faa_data_helper');

app.launch(function(req, res) {
    //console.log('Hitting launch function');
    var prompt = 'For delay information, tell me an Airport code.';
    //console.log(req);
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
    //console.log(res)

});

app.intent('airportinfo', {
    'slots': {
        'AIRPORTCODE': 'FAACODES'
    },

    'utterances': ['{|flight|airport} {|delay|status} {|info} {|for} {|AIRPORTCODE}']
    },
    function(req,res) {

    }
);

module.exports = app;

