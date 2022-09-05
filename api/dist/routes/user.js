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
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middlewares/auth");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.get('/users', auth_1.auth, user_controller_1.userController.index);
            this.router.post('/users', auth_1.auth, user_controller_1.userController.store);
            this.router.get('/users/:id', auth_1.auth, user_controller_1.userController.show);
            this.router.put('/users/:id', auth_1.auth, user_controller_1.userController.update);
            this.router.delete('/users/:id', auth_1.auth, user_controller_1.userController.destroy);
        });
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
