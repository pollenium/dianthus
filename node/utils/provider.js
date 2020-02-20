"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ethers_1 = require("ethers");
var dotenv_safe_1 = __importDefault(require("dotenv-safe"));
dotenv_safe_1["default"].config();
exports.provider = new ethers_1.ethers.providers.InfuraProvider('homestead', process.env.INFURA_ID);
