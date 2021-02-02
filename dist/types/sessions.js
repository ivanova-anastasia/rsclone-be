"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var SessionsSchema = new mongoose_1.default.Schema({
    token: { type: String, required: true, trim: true, unique: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Users", required: true, trim: true },
    expiresAt: { type: String, trim: true }
}, {
    versionKey: false,
});
var SessionsModel = mongoose_1.default.model('Sessions', SessionsSchema);
exports.SessionsModel = SessionsModel;
//# sourceMappingURL=sessions.js.map