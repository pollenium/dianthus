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
var pollenium_uvaursi_1 = require("pollenium-uvaursi");
var createServer_1 = require("../utils/createServer");
var daishReader_1 = require("../utils/daishReader");
var engineReader_1 = require("../utils/engineReader");
var pollenium_xeranthemum_1 = require("pollenium-xeranthemum");
var pollenium_xanthoceras_1 = require("pollenium-xanthoceras");
var __1 = require("../");
var port = 4920;
createServer_1.createServer(port);
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var dianthusTesterKeypair, client, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, pollenium_xeranthemum_1.utils.promptComputeKeypair()];
                case 1:
                    dianthusTesterKeypair = _d.sent();
                    if (!dianthusTesterKeypair.getAddress().uu.getIsEqual(pollenium_xeranthemum_1.users.dianthusTester)) {
                        throw new Error('Not dianthusTester');
                    }
                    client = new __1.Client("http://localhost:" + port);
                    _b = (_a = client).genAndUploadDepositRequest;
                    _c = {
                        fromPrivateKey: dianthusTesterKeypair.privateKey,
                        to: pollenium_xeranthemum_1.users.dianthusTester,
                        nonce: pollenium_uvaursi_1.Uu.genRandom(32),
                        token: pollenium_xanthoceras_1.dai
                    };
                    return [4 /*yield*/, daishReader_1.daishReader.fetchBalance(pollenium_xeranthemum_1.users.dianthusTester)];
                case 2:
                    _c.amount = _d.sent(),
                        _c.expiration = Math.floor((new Date().getTime()) / 1000) + 30;
                    return [4 /*yield*/, engineReader_1.engineReader.fetchDepositSalt()];
                case 3: return [4 /*yield*/, _b.apply(_a, [(_c.actionSalt = _d.sent(),
                            _c)])];
                case 4:
                    _d.sent();
                    return [2 /*return*/];
            }
        });
    });
}
run()["catch"](function (error) {
    console.log('ERROR', error.message);
});
