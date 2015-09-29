/*global define*/
define(["knockout"], function (ko) {
    "use strict";
    var KoModels = {
        FareMatrix: function (data) {
            this.MatrixID = ko.observable(data.MatrixID || 0);
            this.MinimumDistance = ko.observable(data.MinimumDistance || 0).extend({numeric: 0, required: 'Please fill minimum distance in km'});
            this.MinimumFare = ko.observable(data.MinimumFare || 0.00).extend({numeric: 2, required: 'Please fill minimum fare'});
            this.SucceedingRate = ko.observable(data.SucceedingRate || 0.00).extend({numeric: 2, required: 'Please fill succeeding rate'});
        },
        RouteStop: function (data) {
            this.ID = ko.observable(data.ID || 0);
            this.Name = ko.observable(data.Name || "").extend({required: 'Please fill name'});
            this.Distance = ko.observable(data.Distance || 0).extend({numeric: 0});
        },
        JeepRoute: function (data) {
            var self = this;
            self.RouteID = ko.observable(data.RouteID || 0);
            self.RouteFrom = ko.observable(data.RouteFrom || "").extend({required: 'Please fill route from'});
            self.RouteTo = ko.observable(data.RouteTo || "").extend({required: 'Please fill route to'});
            self.RouteName = ko.computed(function () { return self.RouteFrom() + '-' + self.RouteTo(); });
            self.RouteStops = ko.observableArray(data.RouteStops || []).extend({minimumItems: 2});
        },
        Jeep: function (data) {
            this.JeepID = ko.observable(data.JeepID || 0);
            this.PlateNo = ko.observable(data.PlateNo || "xxx123").extend({required: 'Please fill plate number'});
            this.PaxCapacity = ko.observable(data.PaxCapacity || 0).extend({numeric: 0, required: 'Please fill passenger capacity'});
            this.RouteID = ko.observable(data.RouteID || 0).extend({required: 'Please select a Route'});
        },
        Pasada: function (data) {
            this.PasadaID = ko.observable(data.PasadaID || 0);
            this.PasadaDate = ko.observable(data.PasadaDate || new Date());
            this.JeepID = ko.observable(data.JeepID || 0).extend({numeric: 0, required: 'Please select a Jeep'});
            this.DriverName = ko.observable(data.DriverName || "").extend({required: 'Please fill driver\'s name'});
            this.Income = ko.observable(data.Income || 0.00).extend({numeric: 2});
            this.Pax = ko.observable(data.Pax || 0).extend({numeric: 0});
        },
        Bayad: function (data) {
            var self = this;
            self.BayadID = ko.observable(data.BayadID || 0);
            self.PasadaID = ko.observable(data.PasadaID || 0);
            self.LoadFrom = ko.observable(new KoModels.RouteStop(data.LoadFrom || {}));
            self.LoadTo = ko.observable(new KoModels.RouteStop(data.LoadTo || {}));
            self.Amount = ko.observable(data.Amount || 0.00).extend({numeric: 2});
            self.Tendered = ko.observable(data.Tendered || 0.00).extend({numeric: 2});
            self.Change = ko.computed(function () {
                return self.Tendered() - self.Amount();
            });
        }
    };
    return KoModels;
});
