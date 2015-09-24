/*global define*/
define(["jquery", "knockout"], function ($, ko) {
    "use strict";
    //credits to jsfiddle.net/rniemeyer/SnPdE
    ko.bindingHandlers.dialog = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var options = ko.utils.unwrapObservable(valueAccessor()) || {};
            setTimeout(function () {
                options.close = function () {
                    allBindingsAccessor().dialogVisible(false);
                };
                $(element).dialog(options);
            }, 0);
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).dialog("destroy");
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var shouldBeOpen = ko.utils.unwrapObservable(allBindingsAccessor().dialogVisible),
                $el = $(element),
                dialog = $el.data("uiDialog") || $el.data("dialog");
            if (dialog) {
                $el.dialog(shouldBeOpen ? "open" : "close");
            }
        }
    };
    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var options = allBindingsAccessor().datepickerOptions || {},
                $el = $(element);
            $el.datepicker(options);
            ko.utils.registerEventHandler(element, "change", function () {
                var observable = valueAccessor();
                observable($el.datepicker("getDate"));
                $el.blur();
            });
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $el.datepicker("destroy");
            });
        },
        update: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()),
                $el = $(element),
                current = $el.datepicker("getDate");
            if (value - current !== 0) {
                $el.datepicker("setDate", value);
            }
        }
    };
});
