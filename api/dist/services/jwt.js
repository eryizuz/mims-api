"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
require("dotenv/config");
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
const getToken = (user) => {
    var _a;
    try {
        const payload = {
            sub: user.id,
            uuid: user.uuid,
            email: user.email,
            username: user.username,
            role: user.role,
            verified: user.verified,
            type: user.type,
            deleted: user.deleted,
            iat: (0, moment_1.default)().unix(),
            exp: (0, moment_1.default)().add(30, 'days').unix()
        };
        const secret = (_a = process.env) === null || _a === void 0 ? void 0 : _a.JWT_KEY;
        return jwt_simple_1.default.encode(payload, secret);
    }
    catch (e) {
        console.log(e);
    }
};
exports.getToken = getToken;
