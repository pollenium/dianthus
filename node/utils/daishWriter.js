"use strict";
exports.__esModule = true;
var pollenium_dianella_1 = require("pollenium-dianella");
var sweeperWallet_1 = require("./sweeperWallet");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
exports.daishWriter = new pollenium_dianella_1.DaishWriter({
    signer: sweeperWallet_1.sweeperWallet,
    address: pollenium_xanthoceras_1.dai
});
