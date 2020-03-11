"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_ilex_1 = require("pollenium-ilex");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_dianella_1 = require("pollenium-dianella");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
var PermitRequest = /** @class */ (function () {
    function PermitRequest(struct) {
        console.log('construct');
        this.holder = new pollenium_buttercup_1.Address(struct.holder);
        this.nonce = new pollenium_buttercup_1.Uint256(struct.nonce);
        this.signature = new pollenium_ilex_1.Signature(struct.signature);
        console.log('v', this.signature.v.toNumber());
    }
    PermitRequest.prototype.getEncoding = function () {
        if (this.encoding) {
            return this.encoding;
        }
        this.encoding = pollenium_uvaursi_1.Uu.genConcat([
            this.holder,
            this.nonce,
            this.signature.getEncoding()
        ]);
        return this.encoding;
    };
    PermitRequest.prototype.getIsSignatureValid = function () {
        var permitHash = pollenium_dianella_1.genPermitHash({
            holder: this.holder,
            nonce: this.nonce,
            spender: pollenium_xanthoceras_1.engine
        });
        var signer = this.signature.getSigner(permitHash);
        return this.holder.uu.getIsEqual(signer);
    };
    PermitRequest.gen = function (struct) {
        var permitStruct = pollenium_dianella_1.genPermitStruct(__assign({ spender: pollenium_xanthoceras_1.engine }, struct));
        return new PermitRequest(permitStruct);
    };
    PermitRequest.fromEncoding = function (encodingUish) {
        var encoding = pollenium_uvaursi_1.Uu.wrap(encodingUish);
        return new PermitRequest({
            holder: encoding.u.slice(0, 20),
            nonce: encoding.u.slice(20, 52),
            signature: pollenium_ilex_1.Signature.fromEncoding(encoding.u.slice(52, 117))
        });
    };
    return PermitRequest;
}());
exports.PermitRequest = PermitRequest;
