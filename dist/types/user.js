"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var UserSchema = new mongoose_1.default.Schema({
    userName: { type: String, required: true, trim: true, unique: true },
    passwordHash: { type: String, required: true, trim: true },
}, {
    versionKey: false,
});
var UsersModel = mongoose_1.default.model('Users', UserSchema);
exports.UsersModel = UsersModel;
//# sourceMappingURL=user.js.map