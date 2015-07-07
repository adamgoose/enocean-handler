var buttonPressHandler = require('./buttonPressHandler');

var handler = new buttonPressHandler('/dev/ttyUSB0', {
	'002a00ba': {
		'A0': function() {
			console.log('turning lights on');
		},
		'AI': function() {
			console.log('turning lights off');
		},
		'B0': function() {
			console.log('setting reading scene');
		},
		'BI': function() {
			console.log('setting sleep scene');
		}
	}
});