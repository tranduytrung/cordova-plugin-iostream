/* global tranduytrung */
/* global Promise */
/* global _ */
/* global Windows */
function StreamHandle(stream) {
	this.stream = stream;
	if (_.isFunction(stream.readAsync)) {
		this.reader = new Windows.Storage.Streams.DataReader(stream);
	}
	
	if (_.isFunction(stream.writeAsync)) {
		this.writer = new Windows.Storage.Streams.DataWriter(stream);
	}
}

StreamHandle.prototype.close = function() {
	if (this.reader) {
		this.reader.detachStream();
	}
	
	if (this.writer) {
		this.writer.detachStream();
	}
	
	this.stream.close();
}

StreamHandle.prototype.getSize = function() {
	if (!this.stream.size) {
		throw new Error("this stream is not supported for getting size");
	}
	
	return this.stream.size;
}

StreamHandle.prototype.seek = function(position) {
	var stream = this.stream;
	if (!_.isFunction(stream.seek)) {
		throw new Error("this stream is unseekable");
	}
	
	if (!_.isNumber(position)) {
		throw new Error("position is not specified");
	}
	
	stream.seek(position);
}

StreamHandle.prototype.copyToAsync = function(destination) {
	var source = this;
	return new Promise(function(resolve, reject) {
		tranduytrung.iostream.StreamHelper.copy(source.stream, destination.stream).done(resolve, reject);
	});
}

StreamHandle.prototype.writeStringAsync = function(str) {
	if (!_.isString(str)) {
		return Promise.reject(new Error("input must be a string")); 
	}
	
	var writer = this.writer;	
	return new Promise(function(resolve, reject) {
		writer.writeString(str);
		writer.storeAsync().done(function(length) {
			resolve(length);
		}, function(err) {
			reject(err);
		});
	});
}

StreamHandle.prototype.readStringAsync = function(count, options) {
	var stream = this.stream;
	var reader = this.reader;
	
	if (_.isObject(count)) {
		options = count;
		count = null;
	} 
	
	var bufferSize = count || stream.size ||  16384;
	options = _.extend({
        ahead: stream.size ? true : false
    }, options);
	
	return new Promise(function(resolve, reject) {
		var winOptions = Windows.Storage.Streams.InputStreamOptions;
		reader.inputStreamOptions = options.ahead? winOptions.readAhead :winOptions.partial; 
		reader.loadAsync(bufferSize).done(function(loadedCount) {
			var str = reader.readString(loadedCount < bufferSize? loadedCount : bufferSize);
			resolve(str);
		}, function(err) {
			reject(err);
		});
	});
}

module.exports = StreamHandle;