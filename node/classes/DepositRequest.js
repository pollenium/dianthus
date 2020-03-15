"use strict";
exports.__esModule = true;
var pollenium_buttercup_1 = require("pollenium-buttercup");
var DepositRequest = /** @class */ (function () {
    function DepositRequest(holder) {
        this.holder = new pollenium_buttercup_1.Address(holder);
    }
    DepositRequest.prototype.getEncoding = function () {
        if (this.encoding) {
            return this.encoding;
        }
        this.encoding = this.holder.uu;
        return this.encoding;
    };
    DepositRequest.fromEncoding = function (encodingUish) {
        return new DepositRequest(encodingUish);
    };
    return DepositRequest;
}());
exports.DepositRequest = DepositRequest;
