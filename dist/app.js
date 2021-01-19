"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var statistics_1 = __importDefault(require("./routes/statistics"));
var app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/statistics', statistics_1.default);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.json({
        statusCode: 404,
    });
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.json(function (err, req, res, next) {
        res.json({
            statusCode: 500,
            message: err.message,
            stack: err.stack,
        });
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map