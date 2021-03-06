/*global requirejs*/
requirejs.config({
    paths: {
        polyfill: 'polyfill',
        jquery: 'jquery-1.11.1',
        jqueryui: 'jquery-ui-1.11.2.min',
        tbootstrap: 'bootstrap.min',
        knockout: 'knockout-3.3.0',
        models: 'models',
        viewmodels: 'viewmodels',
        custombindings: 'custombindings',
        extensions: 'ko.extensions'
    },
    shim: {
        tbootstrap: {
            deps: ['jquery']
        }
    }
});
requirejs(['jquery', 'knockout', 'viewmodels', 'tbootstrap', 'polyfill', 'custombindings', 'extensions', 'jqueryui', 'domReady!'], function ($, ko, ViewModels) {
    "use strict";
    var dbvm = new ViewModels.DashBoard();
    window.dbvm = dbvm;
    window.ko = ko;
    ko.applyBindings(dbvm, document.getElementById("DashBoardView"));
});
