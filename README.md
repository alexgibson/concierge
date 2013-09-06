Concierge
=========

UI component for installing [Open Web Apps](https://developer.mozilla.org/en-US/docs/Web/Apps) via the browser.

Concierge provides a customisable “install” button that can be used in any web app. It will only display on browsers that support installable Open Web Apps, and only if the app has not yet been installed on a device.

Note: This project is still in early stages of development

Demo: [https://alexgibson.github.com/concierge](https://alexgibson.github.com/concierge)

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/concierge/archive/master.zip)
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
