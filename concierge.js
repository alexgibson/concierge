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
                    Concierge.prototype.create(url);
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

    Concierge.prototype.getMetaData = function (url) {
        var req = new XMLHttpRequest();
        req.onload = this.parseMetaData;
        req.open('get', url, true);
        req.send();
    };

    Concierge.prototype.parseMetaData = function () {
        var doc = document;
        var data = JSON.parse(this.responseText);
        var name = data.name;
        var icon = data.icons['128'];
        var img = doc.getElementById('concierge-icon');

        doc.getElementById('concierge-button').innerHTML = 'Install ' + name;

        if (icon) {
            img.src = icon;
            img.alt = data.name;
        }
    };

    Concierge.prototype.create = function (url) {
        var doc = document;
        var bar = doc.createElement('div');
        var button = doc.createElement('span');
        var close = doc.createElement('span');
        var icon = doc.createElement('img');

        bar.id = 'concierge';
        icon.id = 'concierge-icon';
        button.id = 'concierge-button';
        button.setAttribute('role', 'button');
        button.setAttribute('tabIndex', '1');
        close.id = 'concierge-close';
        close.setAttribute('role', 'button');
        close.setAttribute('tabIndex', '1');
        close.innerHTML = 'Close';

        bar.appendChild(icon);
        bar.appendChild(button);
        bar.appendChild(close);
        doc.body.appendChild(bar);

        doc.getElementById('concierge-close').addEventListener('click', this.destroy, false);

        this.getMetaData(url);
    };

    Concierge.prototype.destroy = function () {
        var doc = document;
        var bar = doc.getElementById('concierge');
        doc.getElementById('concierge-close').removeEventListener('click', this.destroy, false);
        doc.body.removeChild(bar);
    };

    return Concierge;

}));

