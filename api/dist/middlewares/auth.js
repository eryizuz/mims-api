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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
require("dotenv/config");
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.headers.authorization)
        return res.status(200).send({
            status: 200,
            message: 'La peticion no tiene la cabecera de autenticacion'
        });
    const Authorization = req.headers.authorization;
    const token = Authorization.split(' ')[1];
    try {
        const secret = (_a = process.env) === null || _a === void 0 ? void 0 : _a.JWT_KEY;
        const payload = yield jwt_simple_1.default.decode(token, secret);
        if (payload.exp <= (0, moment_1.default)().unix())
            return res.status(401).send({
                message: 'El token ha expirado'
            });
        req.user = payload;
    }
    catch (e) {
        console.log(e);
        return res.status(401).json({ status: 401, message: 'El token no es válido' });
    }
    next();
});
exports.auth = auth;
