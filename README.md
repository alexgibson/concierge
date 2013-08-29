Open Web Installer
==================

A responsive UI component for installing [Open Web Apps](https://developer.mozilla.org/en-US/docs/Web/Apps) via the browser.

This project is still in beta status

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
