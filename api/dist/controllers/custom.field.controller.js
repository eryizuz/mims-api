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
exports.customFieldController = void 0;
const custom_field_model_1 = require("../models/custom.field.model");
class CustomFieldController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fields = yield custom_field_model_1.CustomField.findAll({
                    where: {
                        deleted: 0,
                        UserId: req.user.sub
                    }
                });
                return res.status(201).json({ status: 201, data: fields });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Algo salio mal.' });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, status, type, content, SetCustomFieldId } = req.body;
                const field = yield custom_field_model_1.CustomField.create({
                    name,
                    status,
                    type,
                    content: JSON.stringify(content),
                    UserId: req.user.sub,
                    SetCustomFieldId,
                    deleted: 0,
                });
                return res.status(201).json({ status: 201, data: field, message: 'Custom Field Saved Successfully' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Algo salio mal.' });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const field = yield custom_field_model_1.CustomField.findOne({
                    where: {
                        id: req.params.id,
                        UserId: req.user.sub,
                        deleted: 0
                    }
                });
                return res.status(201).json({ status: 201, data: field });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Algo salio mal.' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, status, type, content, SetCustomFieldId } = req.body;
                const field = yield custom_field_model_1.CustomField.findOne({
                    where: {
                        id: req.params.id,
                        UserId: req.user.sub,
                        deleted: 0
                    }
                });
                yield (field === null || field === void 0 ? void 0 : field.update({
                    name,
                    status,
                    type,
                    content: JSON.stringify(content),
                    SetCustomFieldId,
                    UserId: req.user.sub
                }));
                return res.status(201).json({ status: 201, data: field, message: 'Custom updated successfully' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Algo salio mal.' });
            }
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const field = yield custom_field_model_1.CustomField.findOne({
                    where: {
                        id: req.params.id,
                        UserId: req.user.sub,
                        deleted: 0
                    }
                });
                yield (field === null || field === void 0 ? void 0 : field.update({
                    deleted: 1
                }));
                return res.status(201).json({ status: 201, data: field, message: 'Custom Field deleted successfully' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Algo salio mal.' });
            }
        });
    }
}
exports.customFieldController = new CustomFieldController();
