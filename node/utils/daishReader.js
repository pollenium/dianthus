"use strict";
exports.__esModule = true;
var pollenium_dianella_1 = require("pollenium-dianella");
var provider_1 = require("./provider");
var dai_1 = require("./dai");
exports.daishReader = new pollenium_dianella_1.DaishReader({
    address: dai_1.dai,
    provider: provider_1.provider
});
