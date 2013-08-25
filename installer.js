
(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD environment
        define('install', [], function () {
            return factory(root, document);
        });
    } else {
        // Browser environment
        root.Installer = factory(root, document);
    }

}(this, function (w, d) {

    'use strict';

    function Installer(el, options) {

        var manifest = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
        var element = typeof el === 'object' ? el : document.getElementById(el);
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
                    element.onclick = function () {
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

    return Installer;

}));

