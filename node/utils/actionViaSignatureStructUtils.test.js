"use strict";
exports.__esModule = true;
var actionViaSignatureStructUtils_1 = require("./actionViaSignatureStructUtils");
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var pollenium_buttercup_1 = require("pollenium-buttercup");
test('actionViaSignatureStructUtils', function () {
    var to = new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.genRandom(20));
    var token = new pollenium_buttercup_1.Address(pollenium_uvaursi_1.Uu.genRandom(20));
    var amount = new pollenium_buttercup_1.Uint256(pollenium_uvaursi_1.Uu.genRandom(32));
    var expiration = new pollenium_buttercup_1.Uint256(pollenium_uvaursi_1.Uu.genRandom(32));
    var nonce = new pollenium_buttercup_1.Bytes32(pollenium_uvaursi_1.Uu.genRandom(32));
    var signature = {
        v: new pollenium_buttercup_1.Uint8(pollenium_uvaursi_1.Uu.genRandom(1)),
        r: new pollenium_buttercup_1.Bytes32(pollenium_uvaursi_1.Uu.genRandom(32)),
        s: new pollenium_buttercup_1.Bytes32(pollenium_uvaursi_1.Uu.genRandom(32))
    };
    var encoding = actionViaSignatureStructUtils_1.actionViaSignatureStructUtils.toEncoding({
        to: to,
        token: token,
        amount: amount,
        expiration: expiration,
        nonce: nonce,
        signature: signature
    });
    var actionViaSignatureStruct = actionViaSignatureStructUtils_1.actionViaSignatureStructUtils.fromEncoding(encoding);
    expect(pollenium_uvaursi_1.Uu.wrap(actionViaSignatureStruct.to).toHex()).toBe(to.uu.toHex());
    expect(pollenium_uvaursi_1.Uu.wrap(actionViaSignatureStruct.token).toHex()).toBe(token.uu.toHex());
    expect(new pollenium_buttercup_1.Uint256(actionViaSignatureStruct.amount).uu.toHex()).toBe(amount.uu.toHex());
    expect(new pollenium_buttercup_1.Uint256(actionViaSignatureStruct.expiration).uu.toHex()).toBe(expiration.uu.toHex());
    expect(pollenium_uvaursi_1.Uu.wrap(actionViaSignatureStruct.nonce).toHex()).toBe(nonce.uu.toHex());
    expect(new pollenium_buttercup_1.Uint8(actionViaSignatureStruct.signature.v).uu.toHex()).toBe(signature.v.uu.toHex());
    expect(pollenium_uvaursi_1.Uu.wrap(actionViaSignatureStruct.signature.r).toHex()).toBe(signature.r.uu.toHex());
    expect(pollenium_uvaursi_1.Uu.wrap(actionViaSignatureStruct.signature.s).toHex()).toBe(signature.s.uu.toHex());
});
