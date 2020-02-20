"use strict";
exports.__esModule = true;
var pollenium_ilex_1 = require("pollenium-ilex");
var sweeperKeypair = new pollenium_ilex_1.Keypair(depositerPrivateKey);
console.log('sweeper', sweeperKeypair.getAddress().uu.toHex());
