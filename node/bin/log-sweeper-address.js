"use strict";
exports.__esModule = true;
var sweeperPrivateKey_1 = require("../utils/sweeperPrivateKey");
var pollenium_ilex_1 = require("pollenium-ilex");
var sweeperKeypair = new pollenium_ilex_1.Keypair(sweeperPrivateKey_1.sweeperPrivateKey);
console.log('sweeper', sweeperKeypair.getAddress().uu.toHex());
