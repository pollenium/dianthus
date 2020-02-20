"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_safe_1 = __importDefault(require("dotenv-safe"));
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
dotenv_safe_1["default"].config();
exports.depositerPrivateKey = new pollenium_buttercup_1.Bytes32(pollenium_uvaursi_1.Uu.fromHexish(process.env.DEPOSITER_PRIVATE_KEY));
