"use strict";
exports.__esModule = true;
var pollenium_dianella_1 = require("pollenium-dianella");
var provider_1 = require("./provider");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
exports.daishReader = new pollenium_dianella_1.DaishReader({
    address: pollenium_xanthoceras_1.dai,
    provider: provider_1.provider
});
