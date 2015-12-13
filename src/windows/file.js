/* global _ */
/* global Windows */
var cordova = require("cordova");
var utils = require("tranduytrung.iostream.utils.windows");
var StreamHandle = require("tranduytrung.iostream.streamHandle.windows");

var getFolderFromPathAsync = Windows.Storage.StorageFolder.getFolderFromPathAsync;
var getFileFromApplicationUriAsync = Windows.Storage.StorageFile.getFileFromApplicationUriAsync;

module.exports = {
    openRead: function (win, fail, args) {
        var path = args[0];
        var uri = new Windows.Foundation.Uri(path);
        getFileFromApplicationUriAsync(uri)
            .done(function (file) {
                file.openReadAsync().done(function (stream) {
                    win(new StreamHandle(stream));
                });
            }, function (err) {
                fail(err);
            });
    },
    openWrite: function (win, fail, args) {
        var path = args[0];
        var options = _.extend({
            override: false
        }, args[1]);
        
        var uri = new Windows.Foundation.Uri(path);

        function openStream(file, completed, onError) {
            file.openAsync(Windows.Storage.FileAccessMode.readWrite)
                .done(function (stream) {
                    if (options.override) {
                        stream.size = 0;
                    } else {
                        stream.seek(stream.size);
                    }

                    completed(new StreamHandle(stream));
                }, function (err) {
                    onError(err);
                });
        }

        getFileFromApplicationUriAsync(uri)
            .done(function (file) {
                openStream(file, win, fail);
            }, function (err) {
                // check if error is file not found: -2147024894
                if (err.number === -2147024894) {
                    var absPath = utils.getNativePath(path);
                    var fileName = utils.getFileName(absPath);
                    var folderPath = utils.getPath(absPath);
                    
                    getFolderFromPathAsync(folderPath).done(function (folder) {
                        folder.createFileAsync(fileName).done(function (file) {
                            openStream(file, win, fail);
                        });
                    }, function (err) {
                        fail(err);
                    })
                } else {
                    fail(err);
                }
            });
    }
}

cordova.commandProxy.add("tranduytrung.iostream.file", module.exports);