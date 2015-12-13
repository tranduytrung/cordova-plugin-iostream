/* global Promise */
var cordova = require("cordova");

function Stream(handle) {
	this.handle = handle;
}

Stream.prototype.close = function() {
	var handle = this.handle;
	return new Promise(function (resolve, reject) {
		cordova.exec(resolve, reject, "tranduytrung.iostream.stream", "close", [handle]);
	});
}

Stream.prototype.getSize = function() {
	var handle = this.handle;
	return new Promise(function (resolve, reject) {
		cordova.exec(resolve, reject, "tranduytrung.iostream.stream", "getSize", [handle]);
	});
}

Stream.prototype.seek = function(position) {
	var handle = this.handle;
	return new Promise(function (resolve, reject) {
		cordova.exec(resolve, reject, "tranduytrung.iostream.stream", "seek", [handle, position]);
	});
}

Stream.prototype.copyTo = function(destStream) {
	var srcHandle = this.handle;
	var destHandle = destStream.handle;
	return new Promise(function (resolve, reject) {
		cordova.exec(resolve, reject, "tranduytrung.iostream.stream", "copy", [srcHandle, destHandle]);
	});
}

Stream.prototype.writeString = function(str) {
	var handle = this.handle;
	return new Promise(function (resolve, reject) {
		cordova.exec(resolve, reject, "tranduytrung.iostream.stream", "writeString", [handle, str]);
	});
}

Stream.prototype.readString = function(count) {
	var handle = this.handle;
	return new Promise(function (resolve, reject) {
		cordova.exec(resolve, reject, "tranduytrung.iostream.stream", "readString", [handle, count]);
	});
}

module.exports = Stream;