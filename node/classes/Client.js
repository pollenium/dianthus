"use strict";
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
    Client.prototype.post = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, node_fetch_1["default"](this.serverUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/octet-stream'
                            },
                            body: pollenium_uvaursi_1.Uu.wrap(data).u.buffer
                        })];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            if (response.body) {
                                message = new pollenium_uvaursi_1.Uu(response.body.read()).toUtf8();
                                throw new Error(message);
                            }
                            throw new Error("HTTP Error: " + response.status);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.genAndUploadPermitRequest = function (struct) {
        var request = PermitRequest_1.PermitRequest.gen(struct);
        var requestEncoding = request.getEncoding();
        return this.post(pollenium_uvaursi_1.Uu.genConcat([
            new Uint8Array([RequestType_1.RequestType.PERMIT]),
            requestEncoding
        ]));
    };
    Client.prototype.genAndUploadDepositSweepRequest = function (holder) {
        var request = new DepositSweepRequest_1.DepositSweepRequest(holder);
        var requestEncoding = request.getEncoding();
        return this.post(pollenium_uvaursi_1.Uu.genConcat([
            new Uint8Array([RequestType_1.RequestType.DEPOSIT_SWEEP]),
            requestEncoding
        ]));
    };
    return Client;
}());
exports.Client = Client;
