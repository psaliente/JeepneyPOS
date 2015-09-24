/*jslint plusplus: true*/
/*global define*/
define([], function () {
    'use strict';
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (search) {
            var d = document, elements, pattern, i, results = [];
            if (d.querySelectorAll) { // IE8
                return d.querySelectorAll("." + search);
            }
            if (d.evaluate) { // IE6, IE7
                pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
                elements = d.evaluate(pattern, d, null, 0, null);
                while ((i = elements.iterateNext())) {
                    results.push(i);
                }
            } else {
                elements = d.getElementsByTagName("*");
                pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
                for (i = 0; i < elements.length; i++) {
                    if (pattern.test(elements[i].className)) {
                        results.push(elements[i]);
                    }
                }
            }
            return results;
        };
    }

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement, fromIndex) {

            var k, O, len, n;

            if (this === null) {
                throw new TypeError('"this" is null or not defined');
            }
            O = Object(this);
            len = O.length >>> 0;
            if (len === 0) {
                return -1;
            }
            n = +fromIndex || 0;
            if (Math.abs(n) === Infinity) {
                n = 0;
            }
            if (n >= len) {
                return -1;
            }
            k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len) {
                if (k in O && O[k] === searchElement) {
                    return k;
                }
                k++;
            }
            return -1;
        };

    }

    if (!Date.now) {
        Date.now = function () {
            return +new Date();
        };
    }

    if (!Date.prototype.toMSJSON) {
        Date.prototype.toMSJSON = function () {
            var date = "\/Date(" + this.getTime() + "+0800)\/";
            return date;
        };
    }

    if (!Date.prototype.toISOString) {
        (function () {
            function pad(number) {
                var r = String(number);
                if (r.length === 1) {
                    r = '0' + r;
                }
                return r;
            }
            Date.prototype.toISOString = function () {
                return this.getUTCFullYear() +
                    '-' + pad(this.getUTCMonth() + 1) +
                    '-' + pad(this.getUTCDate()) +
                    'T' + pad(this.getUTCHours()) +
                    ':' + pad(this.getUTCMinutes()) +
                    ':' + pad(this.getUTCSeconds()) +
                    '.' + String((this.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5) + 'Z';
            };
        }());
    }

    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === "[object Array]";
        };
    }

    if (!Array.prototype.filter) {
        Array.prototype.filter = function (fun/*, thisArg*/) {
            var t, len, res, thisArg, i, val;

            if (this === void 0 || this === null) {
                throw new TypeError();
            }

            t = Object(this);
            len = t.length >>> 0;
            if (typeof fun !== 'function') {
                throw new TypeError();
            }

            res = [];
            thisArg = arguments.length >= 2 ? arguments[1] : void 0;
            for (i = 0; i < len; i++) {
                if (i in t) {
                    val = t[i];

                    // NOTE: Technically this should Object.defineProperty at
                    //       the next index, as push can be affected by
                    //       properties on Object.prototype and Array.prototype.
                    //       But that method's new, and collisions should be
                    //       rare, so use the more-compatible alternative.
                    if (fun.call(thisArg, val, i, t)) {
                        res.push(val);
                    }
                }
            }

            return res;
        };
    }

    if (!String.prototype.trim) {
        (function () {
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function () {
                return this.replace(rtrim, '');
            };
        })();
    }

});
