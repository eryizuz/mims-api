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
const set_custom_field_controller_1 = require("../controllers/set.custom.field.controller");
const auth_1 = require("../middlewares/auth");
class SetCustomFieldRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.get('/sets', auth_1.auth, set_custom_field_controller_1.setCustomFieldController.index);
            this.router.post('/sets', auth_1.auth, set_custom_field_controller_1.setCustomFieldController.store);
            this.router.get('/sets/:id', auth_1.auth, set_custom_field_controller_1.setCustomFieldController.show);
            this.router.put('/sets/:id', auth_1.auth, set_custom_field_controller_1.setCustomFieldController.update);
            this.router.delete('/sets/:id', auth_1.auth, set_custom_field_controller_1.setCustomFieldController.destroy);
        });
    }
}
const setCustomFieldRoutes = new SetCustomFieldRoutes();
exports.default = setCustomFieldRoutes.router;
