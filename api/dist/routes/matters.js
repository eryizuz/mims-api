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
const matter_controller_1 = require("../controllers/matter.controller");
const auth_1 = require("../middlewares/auth");
class MatterRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.get('/matters', auth_1.auth, matter_controller_1.matterController.index);
            this.router.post('/matters', auth_1.auth, matter_controller_1.matterController.store);
            this.router.get('/matters/:id', auth_1.auth, matter_controller_1.matterController.show);
            this.router.put('/matters/:id', auth_1.auth, matter_controller_1.matterController.update);
            this.router.delete('/matters/:id', auth_1.auth, matter_controller_1.matterController.destroy);
        });
    }
}
const matterRoutes = new MatterRoutes();
exports.default = matterRoutes.router;
