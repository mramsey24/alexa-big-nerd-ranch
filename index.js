'use strict';

module.change_code = 1;

var _ = require('lodash');

var Alexa = require('alexa-app');

var app = new Alexa.app('airportinfo');

var FAADataHelper = require('./faa_data_helper');

app.launch(function (req, res) {
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
    function (req, res) {
        //get the slots

        var airportCode = req.slot('AIRPORTCODE');

        var reprompt = 'Tell me an airportcode to get delay information';

        if (_.isEmpty(airportCode)) {
            var prompt = 'I did\'t hear an airport code. Tell me an airport code.';

            res.say(prompt).reprompt(reprompt).shouldEndSession(false);

            return true;
        } else {
            var faaHelper = new FAADataHelper();
            faaHelper.requestAirportStatus(airportCode).then(function (airportStatus) {
                console.log(airportStatus);
                res.say(faaHelper.formatAirportStatus(airportStatus)).send();

            }).catch(function (err) {
                console.log(err.statusCode);

                var prompt = 'I didn\'t have data for an airport code of ' + airportCode;

                res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
            });
            return false;
        }

    }
);

module.exports = app;