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
const contact_controller_1 = require("../controllers/contact.controller");
const auth_1 = require("../middlewares/auth");
class ContactRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.router.get('/contacts', auth_1.auth, contact_controller_1.contactController.index);
            this.router.get('/clients', auth_1.auth, contact_controller_1.contactController.clients);
            this.router.post('/contacts', auth_1.auth, contact_controller_1.contactController.store);
            this.router.get('/contacts/:id', auth_1.auth, contact_controller_1.contactController.show);
            this.router.put('/contacts/:id', auth_1.auth, contact_controller_1.contactController.update);
            this.router.delete('/contacts/:id', auth_1.auth, contact_controller_1.contactController.destroy);
        });
    }
}
const contactRoutes = new ContactRoutes();
exports.default = contactRoutes.router;
