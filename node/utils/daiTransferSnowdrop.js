"use strict";
exports.__esModule = true;
var pollenium_snowdrop_1 = require("pollenium-snowdrop");
var ethers_1 = require("ethers");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var provider_1 = require("./provider");
var dai_1 = require("./dai");
exports.daiTransferSnowdrop = new pollenium_snowdrop_1.Snowdrop();
var daiContract = new ethers_1.ethers.Contract(dai_1.dai.uu.toPhex(), ['event Transfer(address indexed src, address indexed dst, uint wad)'], provider_1.provider);
daiContract.on('Transfer', function (src, dst, wad) {
    exports.daiTransferSnowdrop.emit({
        src: new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.fromHexish(src)),
        dst: new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.fromHexish(dst)),
        wad: pollenium_buttercup_1.Uint256.fromNumberString(10, wad.toString(10))
    });
});
