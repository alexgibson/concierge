
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

        var href = location.href;
        var manifest = "/manifest.webapp";
        var url = href.substring(0, href.lastIndexOf("/")) + manifest;
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

            request = navigator.mozApps.checkInstalled(url);
            request.onsuccess = function () {

                if (!this.result) {
                    Installer.prototype.create();
                    button = document.getElementById('installer-button');

                    button.onclick = function () {
                        install = navigator.mozApps.install(url);
                        install.onsuccess = function () {
                            if (success) {
                                success();
                            }
                            Installer.prototype.destroy();
                        };
                        install.onerror = function () {
                            if (error) {
                                error(this.error.name);
                            }
                        };
                    };
                }
            };
        }
    }

    Installer.prototype.create = function () {
        var bar = document.createElement('div');
        var button = document.createElement('span');
        var close = document.createElement('span');
        var action = 'ontouchstart' in window ? 'Tap' : 'Click';

        bar.id = 'installer';
        button.id = 'installer-button';
        button.setAttribute('role', 'button');
        button.innerHTML = action + ' to install this app';
        close.id = 'installer-close';
        close.setAttribute('role', 'button');
        close.innerHTML = 'Close';

        bar.appendChild(button);
        bar.appendChild(close);
        document.body.appendChild(bar);

        document.getElementById('installer-close').addEventListener('click', this.destroy, false);
    };

    Installer.prototype.destroy = function () {
        var bar = document.getElementById('installer');
        document.getElementById('installer-close').removeEventListener('click', this.destroy, false);
        document.body.removeChild(bar);
    };

    return Installer;

}));

