/*global define*/
define(["knockout"], function (ko) {
    "use strict";
    var KoModels = {
        FareMatrix: function (data) {
            this.MatrixID = ko.observable(data.MatrixID || 0);
            this.MinimumFare = ko.observable(data.MinimumFare || 0.00);
            this.SucceedingRate = ko.observable(data.SucceedingRate || 0.00);
        },
        RouteStop: function (data) {
            this.ID = ko.observable(data.ID || 0);
            this.Name = ko.observable(data.Name || "");
        },
        JeepRoute: function (data) {
            var self = this;
            self.RouteID = ko.observable(data.RouteID || 0);
            self.RouteFrom = ko.observable(data.RouteFrom || "");
            self.RouteTo = ko.observable(data.RouteTo || "");
            self.RouteName = ko.computed(function () { return self.RouteFrom() + '-' + self.RouteTo(); });
            self.RouteStops = ko.observableArray(data.RouteStops || []);
        },
        Jeep: function (data) {
            this.JeepID = ko.observable(data.JeepID || 0);
            this.PlateNo = ko.observable(data.PlateNo || "xxx123");
            this.PaxCapacity = ko.observable(data.PaxCapacity || 0);
            this.RouteID = ko.observable(data.RouteID || 0);
        },
        Pasada: function (data) {
            this.PasadaID = ko.observable(data.PasadaID || 0);
            this.PasadaDate = ko.observable(data.PasadaDate || new Date());
            this.JeepID = ko.observable(data.JeepID || 0);
            this.DriverName = ko.observable(data.DriverName || "");
            this.Income = ko.observable(data.Income || 0.00);
            this.Pax = ko.observable(data.Pax || 0);
        },
        Bayad: function (data) {
            var self = this;
            self.BayadID = ko.observable(data.BayadID || 0);
            self.PasadaID = ko.observable(data.PasadaID || 0);
            self.LoadFrom = ko.observable(new KoModels.RouteStop(data.LoadFrom || {}));
            self.LoadTo = ko.observable(new KoModels.RouteStop(data.LoadTo || {}));
            self.Amount = ko.observable(data.Amount || 0.00);
            self.Tendered = ko.observable(data.Tendered || 0.00);
            self.Change = ko.computed(function () {
                return self.Tendered() - self.Amount();
            });
        }
    };
    return KoModels;
});
