// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
				// TODO: This application has been newly launched. Initialize your application here.
			} else {
				// TODO: This application was suspended and then terminated.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
			}
			args.setPromise(WinJS.UI.processAll());
		}

	    var myStream = null, herStream = null;
	    var myFileUri = new Windows.Foundation.Uri("ms-appx:///default.html");
	    Windows.Storage.StorageFile.getFileFromApplicationUriAsync(myFileUri).then((file) => {
	        return file.openReadAsync();
        }).then((stream) => {
            myStream = stream;
	        return Windows.Storage.ApplicationData.current.localFolder.createFileAsync("copy.txt");
	    }).then((file) => {
	        return file.openAsync(Windows.Storage.FileAccessMode.readWrite);
	    }).then((stream) => {
	        herStream = stream;
	        return tranduytrung.iostream.StreamHelper.copy(myStream, herStream);
	    }).then(() => {
	        myStream.close();
	        herStream.close();
	    });
	};

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	app.start();
})();
