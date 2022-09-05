"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
require("dotenv/config");
const nodemailer = __importStar(require("nodemailer"));
const host = (_a = process.env) === null || _a === void 0 ? void 0 : _a.SMTP_HOST;
const port = (_b = process.env) === null || _b === void 0 ? void 0 : _b.SMTP_PORT;
const secure = false;
const user = (_c = process.env) === null || _c === void 0 ? void 0 : _c.SMTP_USER;
const pass = (_d = process.env) === null || _d === void 0 ? void 0 : _d.SMTP_PASSWORD;
const transport = {
    host: host,
    port: port,
    // secure: true,
    auth: {
        user: user,
        pass: pass
    }
};
exports.transporter = nodemailer.createTransport(transport);
