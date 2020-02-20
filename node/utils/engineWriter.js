"use strict";
exports.__esModule = true;
var pollenium_alchemilla_1 = require("pollenium-alchemilla");
var sweeperWallet_1 = require("./sweeperWallet");
var engine_1 = require("./engine");
exports.engineWriter = new pollenium_alchemilla_1.EngineWriter({
    signer: sweeperWallet_1.sweeperWallet,
    address: engine_1.engine
});
