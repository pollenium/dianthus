"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var provider_1 = require("./provider");
var sweeperPrivateKey_1 = require("./sweeperPrivateKey");
exports.sweeperWallet = new ethers_1.ethers.Wallet(sweeperPrivateKey_1.sweeperPrivateKey.u, provider_1.provider);
