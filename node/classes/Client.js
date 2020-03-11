"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var PermitRequest_1 = require("./PermitRequest");
var DepositSweepRequest_1 = require("./DepositSweepRequest");
var RequestType_1 = require("../RequestType");
var node_fetch_1 = __importDefault(require("node-fetch"));
var Client = /** @class */ (function () {
    function Client(serverUrl) {
        this.serverUrl = serverUrl;
    }
    Client.prototype.genAndUploadPermitRequest = function (struct) {
        var request = PermitRequest_1.PermitRequest.gen(struct);
        var requestEncoding = request.getEncoding();
        return node_fetch_1["default"](this.serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            body: pollenium_uvaursi_1.Uu.genConcat([
                new Uint8Array([RequestType_1.RequestType.PERMIT]),
                requestEncoding
            ]).u
        });
    };
    Client.prototype.genAndUploadDepositSweepRequest = function (holder) {
        var request = new DepositSweepRequest_1.DepositSweepRequest(holder);
        var requestEncoding = request.getEncoding();
        return node_fetch_1["default"](this.serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            body: pollenium_uvaursi_1.Uu.genConcat([
                new Uint8Array([RequestType_1.RequestType.DEPOSIT_SWEEP]),
                requestEncoding
            ]).u
        });
    };
    return Client;
}());
exports.Client = Client;
