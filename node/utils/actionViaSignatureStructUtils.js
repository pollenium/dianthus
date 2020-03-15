"use strict";
exports.__esModule = true;
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_ilex_1 = require("pollenium-ilex");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var actionViaSignatureStructUtils;
(function (actionViaSignatureStructUtils) {
    function toEncoding(struct) {
        return pollenium_uvaursi_1.Uu.genConcat([
            struct.to,
            struct.token,
            new pollenium_buttercup_1.Uint256(struct.amount),
            new pollenium_buttercup_1.Uint256(struct.expiration),
            struct.nonce,
            new pollenium_ilex_1.Signature(struct.signature).getEncoding()
        ]);
    }
    actionViaSignatureStructUtils.toEncoding = toEncoding;
    function fromEncoding(encodingUish) {
        var encoding = pollenium_uvaursi_1.Uu.wrap(encodingUish);
        return {
            to: new pollenium_buttercup_1.Address(encoding.u.slice(0, 20)),
            token: new pollenium_buttercup_1.Address(encoding.u.slice(20, 40)),
            amount: new pollenium_buttercup_1.Uint256(encoding.u.slice(40, 72)),
            expiration: new pollenium_buttercup_1.Uint256(encoding.u.slice(72, 104)),
            nonce: new pollenium_buttercup_1.Uint256(encoding.u.slice(104, 136)),
            signature: pollenium_ilex_1.Signature.fromEncoding(encoding.u.slice(136, 201))
        };
    }
    actionViaSignatureStructUtils.fromEncoding = fromEncoding;
})(actionViaSignatureStructUtils = exports.actionViaSignatureStructUtils || (exports.actionViaSignatureStructUtils = {}));
