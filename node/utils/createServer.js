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
var http_1 = require("http");
var PermitRequest_1 = require("../classes/PermitRequest");
var daishReader_1 = require("./daishReader");
var daishWriter_1 = require("./daishWriter");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
var lastPermittedAtByHolderHex = {};
var permitCooldown = 5 * 60 * 1000;
function createServer(port) {
    var _this = this;
    http_1.createServer(function (request, response) {
        request.on('data', function (encoding) { return __awaiter(_this, void 0, void 0, function () {
            var permitRequest, balance, allowance, holderHex, lastPermittedAt, ellapsed, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        permitRequest = PermitRequest_1.PermitRequest.fromEncoding(encoding);
                        if (!permitRequest.getIsSignatureValid()) {
                            throw new Error('Invalid signature');
                        }
                        return [4 /*yield*/, daishReader_1.daishReader.fetchBalance(permitRequest.holder)];
                    case 1:
                        balance = _a.sent();
                        if (balance.compEq(0)) {
                            throw new Error('Dai balance is 0');
                        }
                        return [4 /*yield*/, daishReader_1.daishReader.fetchAllowance({
                                holder: permitRequest.holder,
                                spender: pollenium_xanthoceras_1.engine
                            })];
                    case 2:
                        allowance = _a.sent();
                        if (allowance.compGt(0)) {
                            throw new Error('Already permitted');
                        }
                        holderHex = permitRequest.holder.uu.toHex();
                        lastPermittedAt = lastPermittedAtByHolderHex[permitRequest.holder.uu.toHex()];
                        if (lastPermittedAtByHolderHex[holderHex] !== null) {
                            ellapsed = new Date().getTime() - lastPermittedAt;
                            if (ellapsed < permitCooldown) {
                                throw new Error("Permitted " + ellapsed + " ago");
                            }
                        }
                        return [4 /*yield*/, daishWriter_1.daishWriter.permit(__assign(__assign({}, permitRequest), { spender: pollenium_xanthoceras_1.engine }))];
                    case 3:
                        _a.sent();
                        lastPermittedAt[holderHex] = new Date().getTime();
                        response.writeHead(200);
                        response.end();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        console.log(err_1);
                        response.writeHead(500);
                        response.end();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    }).listen(port);
}
exports.createServer = createServer;
