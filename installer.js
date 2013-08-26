
(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD environment
        define('installer', [], function () {
            return factory(root, document);
        });
    } else {
        // Browser environment
        root.Installer = factory(root, document);
    }

}(this, function (w, d) {

    'use strict';

    function Installer(options) {

        var manifest = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
        var button;
        var request;
        var install;
        var success;
        var error;

        this.options = {
            onSuccess: null,
            onError: null
        };

        if (typeof options === 'object') {

            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }

            if (typeof this.options.onSuccess === 'function') {
                success = this.options.onSuccess;
            }

            if (typeof this.options.onError === 'function') {
                error = this.options.onError;
            }
        }

        if (navigator.mozApps) {

            request = navigator.mozApps.getSelf();
            request.onsuccess = function () {

                if (!request.result) {
                    Installer.prototype.createInstallerBar();
                    button = document.getElementById('open-web-installer-button');

                    button.onclick = function () {
                        install = navigator.mozApps.install(manifest);
                        install.onsuccess = function () {
                            if (success) {
                                success();
                            }
                        };
                        install.onerror = function () {
                            if (error) {
                                error(install.error.name);
                            }
                        };
                        Installer.prototype.removeInstallerBar();
                    };
                }
            };
            request.onerror = function () {
                if (error) {
                    error(request.error.name);
                }
            };
        }
    }

    Installer.prototype.createInstallerBar = function () {
        var bar = document.createElement('div');
        var button = document.createElement('div');

        bar.id = 'open-web-installer';
        button.id = 'open-web-installer-button';
        button.setAttribute('role', 'button');
        button.innerHTML = 'Tap to install app';

        bar.appendChild(button);
        document.body.appendChild(bar);
    };

    Installer.prototype.removeInstallerBar = function () {
        var bar = document.getElementById('open-web-installer');
        document.body.removeChild(bar);
    };

    return Installer;

}));

