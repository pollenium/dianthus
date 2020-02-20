"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var depositerPrivateKey_1 = require("./depositerPrivateKey");
exports.wallet = new ethers_1.ethers.Wallet(depositerPrivateKey_1.depositerPrivateKey.u);
