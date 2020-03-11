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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var daiTransferSnowdrop_1 = require("../utils/daiTransferSnowdrop");
var fetchPermitRequest_1 = require("../utils/fetchPermitRequest");
var pollenium_buttercup_1 = require("pollenium-buttercup");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
var dai_1 = require("../utils/dai");
var daishReader_1 = require("../utils/daishReader");
var daishWriter_1 = require("../utils/daishWriter");
var engineWriter_1 = require("../utils/engineWriter");
var MIN_DEPOSIT = 1;
var nullAddress = pollenium_buttercup_1.Address.genNull();
console.log('=== S W E E P ===');
daiTransferSnowdrop_1.daiTransferSnowdrop.addHandle(function (daiTransfer) { return __awaiter(void 0, void 0, void 0, function () {
    var dst, permitRequest, balance, allowance, nonce;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dst = daiTransfer.dst;
                if (dst.uu.getIsEqual(nullAddress)) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, fetchPermitRequest_1.fetchPermitRequest(dst)];
            case 1:
                permitRequest = _a.sent();
                if (!permitRequest) {
                    return [2 /*return*/];
                }
                console.log('================');
                console.log('dst', dst.uu.toHex());
                return [4 /*yield*/, daishReader_1.daishReader.fetchBalance(dst)];
            case 2:
                balance = _a.sent();
                console.log('balance', balance.toNumberString(10));
                if (balance.compLt(MIN_DEPOSIT)) {
                    console.log('below min deposit');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, daishReader_1.daishReader.fetchAllowance({
                        holder: dst,
                        spender: pollenium_xanthoceras_1.engine
                    })];
            case 3:
                allowance = _a.sent();
                console.log('allowance', allowance.toNumberString(10));
                if (!allowance.compLt(balance)) return [3 /*break*/, 6];
                console.log('balance lt allowance');
                return [4 /*yield*/, daishReader_1.daishReader.fetchNonce(dst)];
            case 4:
                nonce = _a.sent();
                console.log('nonce', nonce.toNumberString(10));
                if (!nonce.uu.getIsEqual(permitRequest.nonce)) return [3 /*break*/, 6];
                console.log('permit');
                return [4 /*yield*/, daishWriter_1.daishWriter.permit(__assign(__assign({}, permitRequest), { spender: pollenium_xanthoceras_1.engine }))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                console.log('deposit via sweep');
                return [4 /*yield*/, engineWriter_1.engineWriter.depositViaSweep({
                        toAndFrom: dst,
                        token: dai_1.dai
                    })];
            case 7:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
