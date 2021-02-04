"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var GameSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        trim: true,
    },
    score: { type: Number, required: true, trim: true },
    totalTime: { type: String, trim: true },
}, {
    versionKey: false,
});
var GameModel = mongoose_1.default.model('Statistics', GameSchema);
exports.GameModel = GameModel;
//# sourceMappingURL=game.js.map