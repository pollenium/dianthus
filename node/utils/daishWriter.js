"use strict";
exports.__esModule = true;
var pollenium_dianella_1 = require("pollenium-dianella");
var sweeperWallet_1 = require("./sweeperWallet");
var dai_1 = require("./dai");
exports.daishWriter = new pollenium_dianella_1.DaishWriter({
    signer: sweeperWallet_1.sweeperWallet,
    address: dai_1.dai
});
