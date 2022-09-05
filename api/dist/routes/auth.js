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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middlewares/auth");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.post('/auth/login', auth_controller_1.authController.login);
            this.router.post('/auth/register', auth_controller_1.authController.register);
            this.router.post('/auth/verify', auth_controller_1.authController.verify);
            this.router.get('/auth/verification', auth_1.auth, auth_controller_1.authController.verification);
        });
    }
}
const authRoutes = new AuthRoutes();
exports.default = authRoutes.router;
