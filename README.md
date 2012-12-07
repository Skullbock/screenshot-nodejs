# Screenshot module for NodeJS

This module lets you easily use the [Snapito](http://snapito.com) APIs in node.js to create screenshots of web pages.
You will need an api key that you can fetch here: http://snapito.com/api-doc-paid#apikeygen

## Installation

Using `npm`:

	npm install screenshot

You can also clone this repository into your `node_modules` directory.

## Examples

### Take a screenshot

```js
var snapito = require('screenshot');
var screenshot = new snapito('yourapikey');

screenshot.screenshot('http://www.google.com', 'google.png', {screen: 'desktop'}, function(file){
	if (file) {
		console.log('The file ' + file + ' was written correctly');
	} else {
		console.log('Error');
	}
});
```

## Available methods

### screenshot

Take a screenshot

You can pass a list of options to this method to customize the API
call to Snapito. Here is a list of them:

- **screen**:   the screen size: web, mobile, desktop (default: desktop)
- **type**:     the type of the screenshot: png, jpeg (default: png)
- **size**:     the size of the screenshot: full (1024x?), lc (1024x768), mc (320x200), sc (80x50) (default: full)
- **width**:    optional. You can provide a custom width (ie: 900)
- **height**:   optional. You can provide a custom height (ie: 200)
- **fast**:     Are you are in a hurry and are willing to sacrifice completeness (like Flash rendering) for speed?. (default: false)
- **freshness**: How old in seconds the screenshot could be. 0 means indefinetly old (default: 0)

```js
var snapito = require('screenshot');
var screenshot = new snapito('yourapikey');

// screenshot.screenshot(url, file, options, callback)
screenshot.screenshot('http://www.google.com', 'google.png', {screen: 'desktop'}, function(file){
	if (file) {
		console.log('The file ' + file + ' was written correctly');
	} else {
		console.log('Error');
	}
});
```