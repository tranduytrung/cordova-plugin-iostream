/* global tranduytrung */
/* global Promise */
/* global _ */
/* global Windows */
var cordova = require("cordova");

module.exports = {
    close: function(win, fail, args) {
        var handle = args[0];
        _.defer(function() {
            handle.close();
        });
    },
    getSize: function(win, fail, args) {
        _.defer(function() {
            var handle = args[0];
            var size = null;
            try {
                size = handle.getSize();
            } catch (e) {
                fail(e);
            }
            
            win(size);
        });
    },
    seek: function(win, fail, args) {
        _.defer(function() {
            var handle = args[0];
            var position = args[1];
            try {
                handle.seek(position);
            } catch (e) {
                fail(e);
            }
            
            win();
        });
    },
    copy: function(win, fail, args) {
        var src = args[0];
        var dest = args[1];
        
        src.copyToAsync(dest).then(win, fail);
    },
    writeString: function(win, fail, args) {
        var handle = args[0]; 
        var data = args[1];
        
        handle.writeStringAsync(data).then(win, fail);
    },
    readString: function(win, fail, args) {
        var handle = args[0]; 
        var count = args[1];
        var options = args[2];
        
        handle.readStringAsync(count, options).then(win, fail);
    }
}

cordova.commandProxy.add("tranduytrung.iostream.stream", module.exports);