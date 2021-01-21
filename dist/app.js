"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
require("./routes/statistics");
var cors_1 = __importDefault(require("cors"));
var bodyparser = __importStar(require("body-parser"));
var routes_1 = require("./routes/routes");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(bodyparser.json());
app.use(express_1.default.urlencoded({ extended: false }));
routes_1.RegisterRoutes(app);
try {
    var swaggerDocument = require('./swagger.json');
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
}
catch (err) {
    console.error('Unable to read swagger.json', err);
}
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