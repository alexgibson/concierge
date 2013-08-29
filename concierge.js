(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD environment
        define('concierge', [], function () {
            return factory(root, document);
        });
    } else {
        // Browser environment
        root.Concierge = factory(root, document);
    }

}(this, function (w, d) {

    'use strict';

    function Concierge(options) {

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
                    Concierge.prototype.create();
                    button = document.getElementById('concierge-button');

                    button.onclick = function () {
                        install = navigator.mozApps.install(url);
                        install.onsuccess = function () {
                            if (success) {
                                success();
                            }
                            Concierge.prototype.destroy();
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

    Concierge.prototype.create = function () {
        var bar = document.createElement('div');
        var button = document.createElement('span');
        var close = document.createElement('span');

        bar.id = 'concierge';
        button.id = 'concierge-button';
        button.setAttribute('role', 'button');
        button.setAttribute('tabIndex', '1');
        button.innerHTML = 'Install this app';
        close.id = 'concierge-close';
        close.setAttribute('role', 'button');
        close.setAttribute('tabIndex', '1');
        close.innerHTML = 'Close';

        bar.appendChild(button);
        bar.appendChild(close);
        document.body.appendChild(bar);

        document.getElementById('concierge-close').addEventListener('click', this.destroy, false);
    };

    Concierge.prototype.destroy = function () {
        var bar = document.getElementById('concierge');
        document.getElementById('concierge-close').removeEventListener('click', this.destroy, false);
        document.body.removeChild(bar);
    };

    return Concierge;

}));

