"use strict";
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var DepositSweepRequest = /** @class */ (function () {
    function DepositSweepRequest(holder) {
        this.holder = new pollenium_buttercup_1.Address(holder);
    }
    DepositSweepRequest.prototype.getEncoding = function () {
        if (this.encoding) {
            return this.encoding;
        }
        this.encoding = this.holder.uu;
        return this.encoding;
    };
    DepositSweepRequest.fromEncoding = function (encodingUish) {
        return new DepositSweepRequest(encodingUish);
    };
    return DepositSweepRequest;
}());
exports.DepositSweepRequest = DepositSweepRequest;
