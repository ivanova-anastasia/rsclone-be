"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = void 0;
var serverErrors_1 = require("./../types/errors/serverErrors");
var sessions_1 = require("../types/sessions");
function expressAuthentication(request, securityName, scopes) {
    if (securityName === 'api_token') {
        var token = request.headers['authorization'];
        console.log('api_token: ' + token);
        return sessions_1.SessionsModel.findOne({ token: token }).then(function (session) {
            if (session !== null) {
                request.app.set('session', session.userId);
                return Promise.resolve();
            }
            else {
                return Promise.reject(new serverErrors_1.ServerError('No token provided', 401));
            }
        });
    }
}
exports.expressAuthentication = expressAuthentication;
//# sourceMappingURL=authentication.js.map