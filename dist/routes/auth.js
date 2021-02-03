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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var tsoa_1 = require("tsoa");
var md5_1 = __importDefault(require("md5"));
var uuid_1 = require("uuid");
var user_1 = require("../types/user");
var sessions_1 = require("../types/sessions");
var serverErrors_1 = require("./../types/errors/serverErrors");
var PG_SALT = process.env.PG_SALT;
var getPasswordHash = function (password) {
    console.log('PG_SALT: ' + PG_SALT);
    return md5_1.default(password + PG_SALT);
};
var generateToken = function (userId) {
    var token = uuid_1.v4();
    var newSession = new sessions_1.SessionsModel({
        token: token,
        userId: userId,
        expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    });
    return newSession
        .save()
        .then(function (item) {
        return item.token;
    })
        .catch(function (err) { return console.log('Session is not saved ' + err); });
};
var removeOldSessions = function (userId) {
    return sessions_1.SessionsModel.deleteMany({ userId: userId })
        .then(function () {
        return userId;
    })
        .catch(function (err) { return console.log('old sessions not found'); });
};
var AuthController = /** @class */ (function (_super) {
    __extends(AuthController, _super);
    function AuthController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthController.prototype.create = function (userName, password) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordHash;
            var _this = this;
            return __generator(this, function (_a) {
                passwordHash = getPasswordHash(password);
                return [2 /*return*/, user_1.UsersModel.findOne({
                        userName: userName,
                        passwordHash: passwordHash,
                    })
                        .then(function (user) {
                        return removeOldSessions(user._id);
                    })
                        .then(function (user) {
                        return generateToken(user._id);
                    })
                        .then(function (token) {
                        _this.setStatus(200);
                        return { token: token };
                    })
                        .catch(function (err) {
                        _this.setStatus(403);
                        return { reason: 'Invalid username or password' };
                    })];
            });
        });
    };
    AuthController.prototype.register = function (userName, password) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordHash, newUser;
            var _this = this;
            return __generator(this, function (_a) {
                passwordHash = getPasswordHash(password);
                newUser = new user_1.UsersModel({
                    userName: userName,
                    passwordHash: passwordHash,
                });
                return [2 /*return*/, user_1.UsersModel.findOne({ userName: userName })
                        .then(function (user) {
                        console.log('user: ' + JSON.stringify(user));
                        if (user) {
                            return Promise.reject(new serverErrors_1.ServerError('This username already exists', 409));
                        }
                        else
                            return null;
                    })
                        .then(function () {
                        return newUser.save();
                    })
                        .then(function (user) {
                        return generateToken(user._id);
                    })
                        .then(function (token) {
                        _this.setStatus(201);
                        return { token: token };
                    })
                        .catch(function (err) {
                        return Promise.reject(new serverErrors_1.ServerError(err, 409));
                    })];
            });
        });
    };
    __decorate([
        tsoa_1.Post('/login'),
        __param(0, tsoa_1.BodyProp()),
        __param(1, tsoa_1.BodyProp())
    ], AuthController.prototype, "create", null);
    __decorate([
        tsoa_1.Post('/register'),
        __param(0, tsoa_1.BodyProp()),
        __param(1, tsoa_1.BodyProp())
    ], AuthController.prototype, "register", null);
    AuthController = __decorate([
        tsoa_1.Route('/auth'),
        tsoa_1.Tags('AuthController')
    ], AuthController);
    return AuthController;
}(tsoa_1.Controller));
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map