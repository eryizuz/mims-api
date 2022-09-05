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
const custom_field_controller_1 = require("../controllers/custom.field.controller");
const auth_1 = require("../middlewares/auth");
class CustomFieldsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.get('/custom_fields', auth_1.auth, custom_field_controller_1.customFieldController.index);
            this.router.post('/custom_fields', auth_1.auth, custom_field_controller_1.customFieldController.store);
            this.router.get('/custom_fields/:id', auth_1.auth, custom_field_controller_1.customFieldController.show);
            this.router.put('/custom_fields/:id', auth_1.auth, custom_field_controller_1.customFieldController.update);
            this.router.delete('/custom_fields/:id', auth_1.auth, custom_field_controller_1.customFieldController.destroy);
        });
    }
}
const customFieldRoutes = new CustomFieldsRoutes();
exports.default = customFieldRoutes.router;
