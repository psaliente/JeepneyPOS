/*global requirejs*/
requirejs.config({
	paths: {
		jasmine: "../lib/jasmine-2.3.4/jasmine",
		jasmineHtml: "../lib/jasmine-2.3.4/jasmine-html",
		jasmineBoot: "../lib/jasmine-2.3.4/boot",
		knockout: '../../js/knockout-3.3.0'
	},
	shim: {
		jasmineHtml: {
			deps: ["jasmine"]
		},
		jasmineBoot: {
			deps: ["jasmine", "jasmineHtml"]
		}
	}
});
requirejs(["jasmineBoot"], function (jasmineBoot) {
    "use strict";
	requirejs(["knockout"], function (ko) {
		//todo create tests here
		window.onload();
	});
});
