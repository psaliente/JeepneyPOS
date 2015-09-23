/*global requirejs*/
requirejs.config({
    paths: {
        jquery: 'jquery-1.11.1',
        tbootstrap: 'bootstrap.min',
        knockout: 'knockout-3.3.0',
        models: 'models',
        viewmodels: 'viewmodels'
    },
    shim: {
        tbootstrap: {
            deps: ['jquery']
        }
    }
});
requirejs(['jquery', 'knockout', 'viewmodels', 'tbootstrap', 'domReady!'], function ($, ko, ViewModels) {
    "use strict";
    var dbvm = new ViewModels.DashBoard();
    ko.applyBindings(dbvm, document.getElementById("DashBoardView"));
});
