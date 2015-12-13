/* global Promise */
var cordova = require("cordova");
var Stream = require("./stream");

var staticFunc = {
	openRead: function (absPath) {
		return new Promise(function (resolve, reject) {
			function win(handle) {
				var stream = new Stream(handle);
				resolve(stream);
			}

			cordova.exec(win, reject, "tranduytrung.iostream.file", "openRead", [absPath]);
		});
	},
	openWrite: function (absPath, options) {
		return new Promise(function (resolve, reject) {
			function win(handle) {
				var stream = new Stream(handle);
				resolve(stream);
			}

			cordova.exec(win, reject, "tranduytrung.iostream.file", "openWrite", [absPath, options]);
		});
	}
};

module.exports = staticFunc;