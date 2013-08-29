Installer
=========

A responsive UI component for installing [Open Web Apps](https://developer.mozilla.org/en-US/docs/Web/Apps) via the browser.

Installer automatically generates a customizable “install” button that can be used in any web app, and only displays on supporting browsers if an app has not already been previously installed.

Note: This project is still in early stages of development

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/open-web-installer/archive/master.zip)
* Git: `git clone https://github.com/alexgibson/open-web-installer.git`

Setup
---------

This component can be used as an AMD module, or a global.

To use create a new `Installer` instance, passing the relevant callbacks you need.

```
var app = new Installer({
    onSuccess: successCallback,
    onError: errorCallback
});

function successCallback () {
    console.log('App installed!');
}

function errorCallback (error) {
    console.error('Installer() error: ' + error);
}
```

Also make sure to link the CSS stylesheet in your template.

```
<link type="text/css" rel="stylesheet" href="open-web-installer.css" />
```

Supported web browsers
----------------------

Open Web Apps are currently supported by Firefox OS, Firefox for Android and Firefox for desktop.
