"use strict";
exports.__esModule = true;
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var sweeperWallet_1 = require("./sweeperWallet");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
exports.engineWriter = new pollenium_alchemilla_1.EngineWriter({
    signer: sweeperWallet_1.sweeperWallet,
    address: pollenium_xanthoceras_1.engine
});
