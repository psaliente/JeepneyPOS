/*global define*/
define(["knockout"], function (ko) {
    "use strict";
    var KoModels = {
        FareMatrix: function (data) {
            this.MatrixID = ko.observable(data.MatrixID || 0);
            this.MinimumFare = ko.observable(data.MinimumFare || 0.00);
            this.SucceedingRate = ko.observable(data.SucceedingRate || 0.00);
        },
        JeepRoute: function (data) {
            this.RouteID = ko.observable(data.RouteID || 0);
            this.RouteFrom = ko.observable(data.RouteFrom || "");
            this.RouteTo = ko.observable(data.RouteTo || "");
            this.RouteStops = ko.observableArray(data.RouteStops || []);
        },
        Jeep: function (data) {
            this.JeepID = ko.observable(data.JeepID || 0);
            this.PaxCapacity = ko.observable(data.PaxCapacity || 0);
            this.CurrentLoad = ko.observable(data.CurrentLoad || 0);
            this.RouteID = ko.observable(data.RouteID || 0);
        },
        Pasada: function (data) {
            this.PasadaID = ko.observable(data.PasadaID || 0);
            this.PasadaDate = ko.observable(data.PasadaDate || new Date());
            this.JeepID = ko.observable(data.JeepID || 0);
            this.Income = ko.observable(data.Income || 0.00);
            this.Pax = ko.observable(data.Pax || 0);
        },
        Bayad: function (data) {
            this.BayadID = ko.observable(data.BayadID || 0);
            this.PasadaID = ko.observable(data.PasadaID || 0);
            this.LoadFrom = ko.observable(data.LoadFrom || "");
            this.LoadTo = ko.observable(data.LoadTo || "");
            this.Amount = ko.observable(data.Amount || 0.00);
            this.Tendered = ko.observable(data.Tendered || 0.00);
            this.Change = ko.observable(data.Change || 0.00);
        }
    };
    return KoModels;
});
