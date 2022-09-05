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
exports.setCustomFieldController = void 0;
const custom_field_model_1 = require("../models/custom.field.model");
const set_custom_field_model_1 = require("../models/set.custom.field.model");
class SetCustomFieldController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sets = yield set_custom_field_model_1.SetCustomField.findAll({
                    where: {
                        UserId: req.user.sub,
                        deleted: 0
                    },
                    include: [
                        { model: custom_field_model_1.CustomField }
                    ]
                });
                return res.status(201).json({ status: 201, data: sets });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, status, type } = req.body;
                const set = yield set_custom_field_model_1.SetCustomField.create({
                    name,
                    status,
                    type,
                    deleted: 0,
                    UserId: req.user.sub
                });
                return res.status(201).json({ status: 201, message: 'Set Custom Field Saved Successfully' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const set = yield set_custom_field_model_1.SetCustomField.findOne({
                    where: {
                        id: req.params.id,
                        deleted: 0
                    },
                    include: [
                        { model: custom_field_model_1.CustomField }
                    ]
                });
                return res.status(201).json({ status: 201, data: set });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, status, type } = req.body;
                const set = yield set_custom_field_model_1.SetCustomField.findOne({
                    where: {
                        id: req.params.id,
                        deleted: 0
                    },
                    include: [
                        { model: custom_field_model_1.CustomField }
                    ]
                });
                if (yield set.update({
                    type,
                    name,
                    status
                })) {
                    return res.status(201).json({ status: 201, message: 'Set Custom Field updated successfully' });
                }
                else {
                    return res.status(401).json({ status: 401, message: 'Not authorized' });
                }
                return res.status(201).json({ status: 201, message: 'Set Custom Field Updated Successfully' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
            }
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const set = yield set_custom_field_model_1.SetCustomField.findOne({
                    where: {
                        id: req.params.id,
                        deleted: 0
                    },
                    include: [
                        { model: custom_field_model_1.CustomField }
                    ]
                });
                if (yield set.update({
                    deleted: 1
                })) {
                    return res.status(201).json({ status: 201, message: 'Set Custom Field deleted successfully' });
                }
                else {
                    return res.status(401).json({ status: 401, message: 'Not authorized' });
                }
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error.' });
            }
        });
    }
}
exports.setCustomFieldController = new SetCustomFieldController();
