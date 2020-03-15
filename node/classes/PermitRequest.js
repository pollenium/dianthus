"use strict";
exports.__esModule = true;
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_ilex_1 = require("pollenium-ilex");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_dianella_1 = require("pollenium-dianella");
var PermitRequest = /** @class */ (function () {
    function PermitRequest(struct) {
        this.holder = new pollenium_buttercup_1.Address(struct.holder);
        this.spender = new pollenium_buttercup_1.Address(struct.spender);
        this.nonce = new pollenium_buttercup_1.Uint256(struct.nonce);
        this.signature = new pollenium_ilex_1.Signature(struct.signature);
    }
    PermitRequest.prototype.getEncoding = function () {
        if (this.encoding) {
            return this.encoding;
        }
        this.encoding = pollenium_uvaursi_1.Uu.genConcat([
            this.holder,
            this.spender,
            this.nonce,
            this.signature.getEncoding()
        ]);
        return this.encoding;
    };
    PermitRequest.prototype.getIsSignatureValid = function () {
        var permitHash = pollenium_dianella_1.genPermitHash({
            holder: this.holder,
            nonce: this.nonce,
            spender: this.spender
        });
        var signer = this.signature.getSigner(permitHash);
        return this.holder.uu.getIsEqual(signer);
    };
    PermitRequest.gen = function (struct) {
        var permitStruct = pollenium_dianella_1.genPermitStruct(struct);
        return new PermitRequest(permitStruct);
    };
    PermitRequest.fromEncoding = function (encodingUish) {
        var encoding = pollenium_uvaursi_1.Uu.wrap(encodingUish);
        return new PermitRequest({
            holder: encoding.u.slice(0, 20),
            spender: encoding.u.slice(20, 40),
            nonce: encoding.u.slice(40, 72),
            signature: pollenium_ilex_1.Signature.fromEncoding(encoding.u.slice(72, 137))
        });
    };
    return PermitRequest;
}());
exports.PermitRequest = PermitRequest;
