"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var PermitRequest_1 = require("../classes/PermitRequest");
var node_fetch_1 = __importDefault(require("node-fetch"));
var createServer_1 = require("../utils/createServer");
var port = 4920;
createServer_1.createServer(4920);
var holderPrivateKey = pollenium_uvaursi_1.Uu.genRandom(32);
var nonce = pollenium_uvaursi_1.Uu.genRandom(2);
var request = PermitRequest_1.PermitRequest.gen({
    holderPrivateKey: holderPrivateKey,
    nonce: nonce
});
var requestEncoding = request.getEncoding();
node_fetch_1["default"]("http://localhost:" + port, {
    method: 'POST',
    body: requestEncoding.u
});
