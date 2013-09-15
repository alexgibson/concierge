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

        var that = this;

        this.href = location.href;
        this.manifest = "/manifest.webapp";
        this.url = this.href.substring(0, this.href.lastIndexOf("/")) + this.manifest;
        this.button = null;
        this.request = null;
        this.install = null;
        this.success = null;
        this.error = null;

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
                this.success = this.options.onSuccess;
            }

            if (typeof this.options.onError === 'function') {
                this.error = this.options.onError;
            }
        }

        if (navigator.mozApps) {
            this.request = navigator.mozApps.checkInstalled(this.url);
            this.request.onsuccess = function () {
                if (!this.result) {
                    that.create();
                    that.button = document.getElementById('concierge-button');
                    that.button.onclick = function () {
                        that.install = navigator.mozApps.install(that.url);

                        that.install.onsuccess = function () {
                            if (that.success) {
                                that.success();
                            }
                            that.destroy();
                        };

                        that.install.onerror = function () {
                            if (that.error) {
                                that.error(this.error.name);
                            }
                        };
                    };
                }
            };
        }
    }

    Concierge.prototype.getMetaData = function () {
        var req = new XMLHttpRequest();
        req.onload = this.parseMetaData;
        req.open('get', this.url, true);
        req.send();
    };

    Concierge.prototype.parseMetaData = function () {
        var doc = document;
        var data = JSON.parse(this.responseText);
        var name = data.name;
        var icon = data.icons['60'] || data.icons['128'];
        var img = doc.getElementById('concierge-icon');

        doc.getElementById('concierge-button').innerHTML = 'Install ' + name;

        if (icon) {
            img.src = icon;
            img.alt = data.name;
        }
    };

    Concierge.prototype.create = function () {
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

        this.getMetaData();
    };

    Concierge.prototype.destroy = function () {
        var doc = document;
        var bar = doc.getElementById('concierge');
        doc.getElementById('concierge-close').removeEventListener('click', this.destroy, false);
        doc.body.removeChild(bar);
    };

    return Concierge;

}));

