/*jslint nomen: true*/
/*global define*/
define(['knockout', 'models'], function (ko, Models) {
    'use strict';
    var ViewModels = {
        DashBoard: function () {
            var self = this;
            self.Filters = {};
            self.DialogToggle = {
                NewRoute: ko.observable(false),
                NewJeep: ko.observable(false),
                NewPasada: ko.observable(false),
                NewBayad: ko.observable(false)
            };
            self.NewStop = ko.observable(new Models.RouteStop({}));
            self.NewRoute = ko.observable(new Models.JeepRoute({}));
            self.NewJeep = ko.observable(new Models.Jeep({}));
            self.NewPasada = ko.observable(new Models.Pasada({}));
            self.NewBayad = ko.observable(new Models.Bayad({}));
            self.CurrentMatrix = new Models.FareMatrix({});
            self.SelectedRoute = ko.observable(new Models.JeepRoute({}));
            self.CurrentJeep = ko.observable(new Models.Jeep({}));
            self.CurrentPasada = ko.observable(new Models.Pasada({}));
            self.Routes = ko.observableArray([]);
            self.Jeeps = ko.observableArray([]);
            self.Pasadas = ko.observableArray([]);
            self.Bayads = ko.observableArray([]);
            self.addStop = function (route) {
                route.RouteStops.push(self.NewStop());
                self.NewStop(new Models.RouteStop({}));
            };
            self.addRoute = function () {
                self.Routes.push(self.NewRoute());
                self.NewRoute(new Models.JeepRoute({}));
                self.DialogToggle.NewRoute(false);
            };
            self.addJeep = function () {
                self.NewJeep().RouteID(self.SelectedRoute().RouteID());
                self.Jeeps.push(self.NewJeep());
                self.NewJeep(new Models.Jeep({}));
                self.DialogToggle.NewJeep(false);
            };
            self.addPasada = function () {
                self.NewPasada().JeepID(self.CurrentJeep().JeepID());
                self.Pasadas.push(self.NewPasada());
                self.NewPasada(new Models.Pasada({}));
                self.DialogToggle.NewPasada(false);
            };
            self.addBayad = function () {
                self.NewBayad().PasadaID(self.NewPasada().PasadaID());
                self.NewPasada().Income(self.NewPasada().Income() + self.NewBayad().Amount());
                self.NewPasada().Pax(self.NewPasada().Pax() + 1);
                self.Bayads.push(self.NewBayad());
                self.NewBayad(new Models.Bayad({}));
                self.DialogToggle.NewBayad(false);
            };
            self.getAmount = ko.computed(function () {
                var _from = self.NewBayad().LoadFrom() ? self.NewBayad().LoadFrom().ID() : 0,
                    _to = self.NewBayad().LoadTo() ? self.NewBayad().LoadTo().ID() : 0,
                    _multiplier = (_to - _from) * (_to < _from ? -1 : 1);
                self.NewBayad().Amount(self.CurrentMatrix.MinimumFare() + self.CurrentMatrix.SucceedingRate() * _multiplier);
            });
            self.lookupRoute = function (routeId) {
                var _route = new Models.JeepRoute({});
                ko.utils.arrayForEach(self.Routes(), function (route) {
                    window.console.log(route.RouteName(), route.RouteStops().length);
                    if (route.RouteID === routeId) {
                        _route = route;
                    }
                });
                return _route;
            };
            self.startPasada = function (jeep) {
                self.SelectedRoute(self.lookupRoute(jeep.RouteID()));
                self.CurrentJeep(jeep);
                self.DialogToggle.NewPasada(true);
            };
        }
    };
    return ViewModels;
});
