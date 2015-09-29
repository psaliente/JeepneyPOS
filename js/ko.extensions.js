/*global define*/
define(["knockout"], function (ko) {
    'use strict';
    ko.extenders.numeric = function (target, precision) {
        var result = ko.pureComputed({
            read: target,
            write: function (newValue) {
                var current = target(),
                    roundingMultiplier = Math.pow(10, precision),
                    newValueAsNum = isNaN(newValue) ? current : parseFloat(+newValue),
                    valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;
                if (valueToWrite !== current) {
                    target(valueToWrite);
                } else {
                    if (newValue !== current) {
                        target.notifySubscribers(valueToWrite);
                    }
                }
            }
        }).extend({ notify: 'always' });
        result(target());
        return result;
    };
    ko.extenders.required = function (target, overrideMsg) {
        target.hasError = ko.observable();
        target.errorMessage = ko.observable();
        function validate(newValue) {
            target.hasError(newValue ? false : true);
            target.errorMessage(newValue ? "" : overrideMsg || "This field is required");
        }
        validate(target());
        target.subscribe(validate);
        return target;
    };
    ko.extenders.minimumItems = function (target, minCount) {
        target.hasError = ko.observable();
        target.errorMessage = ko.observable();
        minCount = parseInt(minCount, 10);
        function validate(newValue) {
            target.hasError(newValue.length < minCount);
            target.errorMessage(newValue.length < minCount ? "Number of items must not be less than " + minCount : "");
        }
        validate(target());
        target.subscribe(validate);
        return target;
    };
});
