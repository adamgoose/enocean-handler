var serialport = require('serialport');
var esp3parser = require('serialport-enocean-parser');
var packetDecoder = require('./packetDecoder');

var Handler = function(dev, callbacks) {

    var port = new serialport(dev, {
        baudrate: 57600,
        parser: esp3parser,
        autoOpen: false
    });

    port.open(function(error) {
        if (error) {
            console.log('Could not open serial port on ' + dev, error);
            process.exit(1);
        } else {
            console.log('Successfully opened serial port on ' + dev);
        }
        port.on('data', function(packet) {
            var action = packetDecoder(packet);
            if (action.isPress) {
                console.log('Press received from ' + action.senderId + ' on buttons ' + action.buttons + '.');
                try {
                    console.info('I ==> Looking for appropriate callback...');
                    callbacks[action.senderId][action.buttons]();
                    console.log('I ==> Fired callback!');
                } catch (TypeError) {
                    console.log('E ==> No callback found.');
                }
            }
        });
    });
}
module.exports = Handler;
