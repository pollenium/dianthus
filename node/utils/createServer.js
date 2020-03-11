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
exports.__esModule = true;
var http_1 = require("http");
var RequestType_1 = require("../RequestType");
var handlePermitEncoding_1 = require("./server/handlePermitEncoding");
var handleDepositSweepEncoding_1 = require("./server/handleDepositSweepEncoding");
function createServer(port) {
    var _this = this;
    http_1.createServer(function (request, response) {
        request.on('data', function (encoding) { return __awaiter(_this, void 0, void 0, function () {
            var requestType, nextEncoding, _a, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        response.setHeader('Access-Control-Allow-Origin', '*');
                        response.setHeader('Access-Control-Request-Method', '*');
                        response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
                        response.setHeader('Access-Control-Allow-Headers', '*');
                        if (request.method === 'OPTIONS') {
                            response.writeHead(200);
                            response.end();
                            return [2 /*return*/];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        requestType = encoding[0];
                        nextEncoding = encoding.slice(1);
                        _a = requestType;
                        switch (_a) {
                            case RequestType_1.RequestType.PERMIT: return [3 /*break*/, 2];
                            case RequestType_1.RequestType.DEPOSIT_SWEEP: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, handlePermitEncoding_1.handlePermitEncoding(nextEncoding)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, handleDepositSweepEncoding_1.handleDepositSweepEncoding(nextEncoding)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6: throw new Error("Unknown request type: " + requestType);
                    case 7:
                        response.writeHead(200);
                        response.end();
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _b.sent();
                        console.log(err_1);
                        response.writeHead(500);
                        response.end();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); });
    }).listen(port);
}
exports.createServer = createServer;
