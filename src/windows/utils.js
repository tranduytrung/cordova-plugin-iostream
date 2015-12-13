/* global _ */
/* global Windows */
var pathsPrefix = {
	"ms-appx:///": Windows.ApplicationModel.Package.current.installedLocation.path + '\\',
	"ms-appdata:///local/": Windows.Storage.ApplicationData.current.localFolder.path + '\\',
	"ms-appdata:///roaming/": Windows.Storage.ApplicationData.current.roamingFolder.path + '\\',
	"ms-appdata:///temp/": Windows.Storage.ApplicationData.current.temporaryFolder.path + '\\'
}

module.exports = {
    getFileName: function (uri) {
		var fsi = uri.lastIndexOf('/');
        var bsi = uri.lastIndexOf('\\');
        return uri.substr((fsi > bsi ? fsi : bsi) + 1);
    },
	getPath: function (uri) {
        var last = uri.charAt(uri.length - 1);
        if (last === '/' || last === '\\') {
            return uri;
        }

        var fsi = uri.lastIndexOf('/');
        var bsi = uri.lastIndexOf('\\');
        if (fsi < 0 && bsi < 0) {
            return uri;
        }

        return uri.substring(0, (fsi > bsi ? fsi : bsi) + 1);
    },
    getNativePath: function (uri) {
		var absPath = null;
		
		_.forIn(pathsPrefix, function(value, key) {
			if (uri.startsWith(key)) {
				absPath = uri.replace(key, value);
				return false;
			}
		});
		
		if (absPath === null) {
			return uri;
		}
		
		return absPath.replace(/\//g, "\\");
    }
}