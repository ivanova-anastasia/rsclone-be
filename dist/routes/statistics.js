"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsController = void 0;
var game_1 = require("../types/game");
var tsoa_1 = require("tsoa");
var StatisticsController = /** @class */ (function (_super) {
    __extends(StatisticsController, _super);
    function StatisticsController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StatisticsController.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, game_1.GameModel.find({}).populate({ path: 'userId', select: 'userName' }).then(function (games) {
                        var users = __spreadArrays(Array.from(new Set(games.map(function (game) { var _a; return (_a = game.userId) === null || _a === void 0 ? void 0 : _a.userName; }))));
                        return users.map(function (user) {
                            var maxScore = games.filter(function (game) { var _a; return ((_a = game.userId) === null || _a === void 0 ? void 0 : _a.userName) === user; }).sort(function (a, b) { return b.score - a.score; })[0].score;
                            return { user: user, score: maxScore };
                        }).sort(function (a, b) { return b.score - a.score; });
                    })
                        .catch(function (err) {
                        _this.setStatus(500);
                    })];
            });
        });
    };
    StatisticsController.prototype.create = function (score, req, totalTime) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, newGame;
            var _this = this;
            return __generator(this, function (_a) {
                userId = req.app.get('session');
                newGame = new game_1.GameModel({
                    userId: userId,
                    score: score,
                    totalTime: totalTime,
                });
                this.setStatus(201);
                return [2 /*return*/, newGame
                        .save()
                        .then(function (item) {
                        _this.setStatus(201);
                        return item;
                    })
                        .catch(function (err) { return _this.setStatus(500); })];
            });
        });
    };
    StatisticsController.prototype.getByUserId = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId;
            var _this = this;
            return __generator(this, function (_a) {
                userId = req.app.get('session');
                return [2 /*return*/, game_1.GameModel.find({ userId: userId })
                        .then(function (items) {
                        return items;
                    })
                        .catch(function (err) { return _this.setStatus(500); })];
            });
        });
    };
    StatisticsController.prototype.deleteByUserId = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userId;
            var _this = this;
            return __generator(this, function (_a) {
                userId = req.app.get('session');
                game_1.GameModel.deleteMany({ userId: userId })
                    .then(function () { return _this.setStatus(204); })
                    .catch(function (err) { return _this.setStatus(500); });
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        tsoa_1.Get('/all')
    ], StatisticsController.prototype, "getAll", null);
    __decorate([
        tsoa_1.Security('api_token'),
        tsoa_1.Post(),
        __param(0, tsoa_1.BodyProp()),
        __param(1, tsoa_1.Request()),
        __param(2, tsoa_1.BodyProp())
    ], StatisticsController.prototype, "create", null);
    __decorate([
        tsoa_1.Security('api_token'),
        tsoa_1.Get(),
        __param(0, tsoa_1.Request())
    ], StatisticsController.prototype, "getByUserId", null);
    __decorate([
        tsoa_1.Security('api_token'),
        tsoa_1.Delete(),
        __param(0, tsoa_1.Request())
    ], StatisticsController.prototype, "deleteByUserId", null);
    StatisticsController = __decorate([
        tsoa_1.Route('/statistics'),
        tsoa_1.Tags('StatisticsController')
    ], StatisticsController);
    return StatisticsController;
}(tsoa_1.Controller));
exports.StatisticsController = StatisticsController;
//# sourceMappingURL=statistics.js.map