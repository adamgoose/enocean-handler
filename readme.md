# Enocean Rocker Switch Handler

This package is designed for easy dispatching of custom Enocean Rocker Switch press handlers.

## Usage

> See example.js!

First, require the package.

```js
var enoceanHandler = require('enocean-handler');
```

Next, instantiate your object and provide it the configuration.

```js
var handler = new enoceanHandler('/dev/ttyUBS0', {
	'mySenderId': {
		'A0': function() {
			console.log('Button A0 was pushed!');
		}
	}
});
```

Yes, it's that easy! :)