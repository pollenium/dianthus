"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_snowdrop_1 = require("pollenium-snowdrop");
var ethers_1 = require("ethers");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var dotenv_safe_1 = __importDefault(require("dotenv-safe"));
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
dotenv_safe_1["default"].config();
var daiTransferSnowdrop;
function getDaiTransferSnowdrop() {
    if (daiTransferSnowdrop) {
        return daiTransferSnowdrop;
    }
    daiTransferSnowdrop = new pollenium_snowdrop_1.Snowdrop();
    var provider = new ethers_1.ethers.providers.InfuraProvider('homestead', process.env.INFURA_ID);
    var daiContract = new ethers_1.ethers.Contract('0x6B175474E89094C44Da98b954EedeAC495271d0F', ['event Transfer(address indexed src, address indexed dst, uint wad)'], provider);
    daiContract.on('Transfer', function (src, dst, wad) {
        daiTransferSnowdrop.emit({
            src: new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.fromHexish(src)),
            dst: new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.fromHexish(dst)),
            wad: pollenium_buttercup_1.Uint256.fromNumberString(10, wad.toString(10))
        });
    });
    return daiTransferSnowdrop;
}
exports.getDaiTransferSnowdrop = getDaiTransferSnowdrop;
