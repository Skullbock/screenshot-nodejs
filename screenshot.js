var request = require('request');
var fs = require('fs');


/**
 * Constructor
 *
 * @param {string} key The snapito api key
 */
var Screenshot = function(key) {
   this.key = key;
}

/**
 * Take a screenshot of an url using Snapito's API
 *
 * You can pass a list of options to this method to customize the API
 * call to Snapito. Here is a list of them:
 *
 * - screen:   the screen size: web, mobile, desktop (default: desktop)
 * - type:     the type of the screenshot: png, jpeg (default: png)
 * - size:     the size of the screenshot: full (1024x?), lc (1024x768), mc (320x200), sc (80x50) (default: full)
 * - width:    optional. You can provide a custom width (ie: 900)
 * - height:   optional. You can provide a custom height (ie: 200)
 * - fast:     Are you are in a hurry and are willing to sacrifice completeness (like Flash rendering) for speed?. (default: false)
 * - freshness:How old in seconds the screenshot could be. 0 means indefinetly old (default: 0)
 * 
 * @param  {string}   url      The url to take the screenshot of
 * @param  {string}   file     The file to write the screenshot to
 * @param  {object}   options  The options for the screenshot, see the desciptions
 * @param  {Function} callback The callback to call when the screenshot is done
 */
Screenshot.prototype.screenshot = function(url, file, options, callback) {

	var params = {};

   // defaut options
	var s = options.screen ? options.screen : 'desktop';
	var type = options.type ? options.type : 'png';
	var size = options.size ? options.size : 'full';
   var cdn = options.cdn ? options.cdn : false;
	params.freshness = '1';

	if (options.fast) {
		params.fast = '';
	}
	
	if (options.timestamp) {
		params.timestamp = '';
	}

	if (options.freshness === false) {
		params.freshness == '0';
	}
	
	if (options.width && options.height) {
		params.size = options.width + 'x' + options.height;
	}

	params.url = encodeURIComponent(url);
   
   	// get website info
   	var options = "http://api.snapito.com/"+s+"/"+this.key+"/"+size+"?";
   	var params_string = [];
   	
   	for (k in params){
   		params_string.push(k + '=' + params[k]);
   	};
   	params_string = params_string.join('&');

   	options += params_string;

   	// Send request
   	request(options).pipe(fs.createWriteStream(file));
};

module.exports = Screenshot;