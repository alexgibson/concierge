Concierge
=========

A responsive UI component for installing [Open Web Apps](https://developer.mozilla.org/en-US/docs/Web/Apps) via the browser.

Concierge creates an customisable “install” button that can be used by any Open Web App, using app manifest meta data to populate the UI.

Features
----------

* Shows the app name and icon along side the generated install button.
* Only appears on browsers that support installable Open Web Apps
* Only appears if the app has not yet been installed on a device.

Try the demo below on Firefox OS, Firefox for Android, or Firefox Nightly (desktop).

Demo: [https://alexgibson.github.com/concierge](https://alexgibson.github.com/concierge)

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/concierge/archive/master.zip)
* [Bower](https://github.com/twitter/bower/): `bower install concierge`
* Git: `git clone https://github.com/alexgibson/concierge.git`

Setup
---------

This component can be used as an AMD module, or a global.

```
var Concierge = require('concierge');
```

To use create a new `Concierge` instance, passing the relevant callbacks you need.

```
var install = new Concierge({
    onSuccess: successCallback,
    onError: errorCallback
});

function successCallback () {
    console.log('App installed!');
}

function errorCallback (error) {
    console.error('Concierge() error: ' + error);
}
```

Also make sure to include the CSS styles in your template.

```
<link type="text/css" rel="stylesheet" href="concierge.css" />
```

Supported web browsers
----------------------

Open Web Apps are currently supported by Firefox OS, Firefox for Android and Firefox for desktop (Nightly recommended).
