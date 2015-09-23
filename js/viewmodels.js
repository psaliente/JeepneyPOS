/*global define*/
define(['knockout', 'models'], function (ko, Models) {
    'use strict';
    var ViewModels = {
        DashBoard: function () {
            var self = this;
            self.Filters = {};
            self.NewRoute = ko.observable(new Models.JeepRoute({}));
            self.NewJeep = ko.observable(new Models.Jeep({}));
            self.NewPasada = ko.observable(new Models.Pasada({}));
            self.NewBayad = ko.observable(new Models.Bayad({}));
            self.CurrentMatrix = ko.observable(new Models.FareMatrix({}));
            self.SelectedRoute = ko.observable();
            self.CurrentJeep = ko.observable();
            self.CurrentPasada = ko.observable();
            self.Routes = ko.observableArray([]);
            self.Jeeps = ko.observableArray([]);
            self.Pasadas = ko.observableArray([]);
            self.Bayads = ko.observableArray([]);
            self.AddRoute = function () {
                self.Routes.push(self.NewRoute());
                self.NewRoute(new Models.JeepRoute({}));
            };
            self.AddJeep = function () {
                self.NewJeep().RouteID(self.SelectedRoute().RouteID());
                self.Jeeps.push(self.NewJeep());
                self.NewJeep(new Models.Jeep({}));
            };
            self.AddPasada = function () {
                self.NewPasada().JeepID(self.CurrentJeep().JeepID());
                self.Pasadas.push(self.NewPasada());
                self.NewPasada(new Models.Pasada({}));
            };
            self.AddBayad = function () {
                self.NewBayad().PasadaID(self.CurrentPasada().PasadaID());
                self.Bayads.push(self.NewBayad());
                self.NewBayad(new Models.Bayad({}));
            };
        }
    };
    return ViewModels;
});
