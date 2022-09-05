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
exports.matterController = void 0;
const matter_model_1 = require("../models/matter.model");
const uid = __importStar(require("uuid"));
class MatterController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let matters = [];
                if (req.user.role < 2) {
                    matters = yield matter_model_1.Matter.findAll({
                        where: {
                            deleted: 0
                        }
                    });
                }
                else {
                    matters = yield matter_model_1.Matter.findAll({
                        where: {
                            deleted: 0,
                            UserId: req.user.sub
                        }
                    });
                }
                return res.status(201).json({ status: 201, data: matters });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let matter;
                if (req.user.role < 2) {
                    matter = yield matter_model_1.Matter.findOne({
                        where: {
                            deleted: 0,
                            id: req.params.id
                        }
                    });
                }
                else {
                    matter = yield matter_model_1.Matter.findOne({
                        where: {
                            deleted: 0,
                            id: req.params.id,
                            UserId: req.user.sub
                        }
                    });
                }
                if (matter) {
                    return res.status(201).json({ status: 201, data: matter });
                }
                else {
                    return res.status(404).json({ status: 404, message: 'Not found' });
                }
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, status, permissions, practice_area, description, responsible_attorney, originating_attorney, open_date, closed_date, pending_date, limitations_date, relationship, custom_fields, set_custom_fields, billing_preferences, task_automation, client_reference_number, location, ClientId } = req.body;
                let uuid = yield uid.v4();
                const matter = yield matter_model_1.Matter.create({
                    type,
                    status,
                    permissions: JSON.stringify(permissions),
                    practice_area: JSON.stringify(practice_area),
                    description,
                    responsible_attorney: JSON.stringify(responsible_attorney),
                    originating_attorney: JSON.stringify(originating_attorney),
                    open_date,
                    closed_date,
                    pending_date,
                    limitations_date,
                    relationship: JSON.stringify(relationship),
                    custom_fields: JSON.stringify(custom_fields),
                    set_custom_fields: JSON.stringify(set_custom_fields),
                    billing_preferences: JSON.stringify(billing_preferences),
                    task_automation: JSON.stringify(task_automation),
                    UserId: req.user.sub,
                    deleted: 0,
                    ClientId,
                    uuid,
                    client_reference_number,
                    location
                });
                return res.status(201).json({
                    status: 201,
                    data: matter
                });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, status, permissions, practice_area, description, responsible_attorney, originating_attorney, open_date, closed_date, pending_date, limitations_date, relationship, custom_fields, set_custom_fields, billing_preferences, task_automation, ClientId, client_reference_number, location } = req.body;
                let uuid = yield uid.v4();
                const matter = yield matter_model_1.Matter.findOne({
                    where: {
                        id: req.params.id,
                        deleted: 0,
                        UserId: req.user.sub
                    }
                });
                yield matter.update({
                    type,
                    status,
                    permissions: JSON.stringify(permissions),
                    practice_area: JSON.stringify(practice_area),
                    description,
                    responsible_attorney: JSON.stringify(responsible_attorney),
                    originating_attorney: JSON.stringify(originating_attorney),
                    open_date,
                    closed_date,
                    pending_date,
                    limitations_date,
                    relationship: JSON.stringify(relationship),
                    custom_fields: JSON.stringify(custom_fields),
                    set_custom_fields: JSON.stringify(set_custom_fields),
                    billing_preferences: JSON.stringify(billing_preferences),
                    task_automation: JSON.stringify(task_automation),
                    UserId: req.user.sub,
                    deleted: 0,
                    ClientId,
                    uuid,
                    location,
                    client_reference_number
                });
                return res.status(201).json({
                    status: 201,
                    message: 'Matter updated successfully'
                });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const matter = yield matter_model_1.Matter.findOne({
                    where: {
                        id: req.params.id,
                        deleted: 0,
                        UserId: req.user.sub
                    }
                });
                if (matter) {
                    yield matter.update({ deleted: 1 });
                    return res.status(201).json({ status: 201, message: 'Matter deleted successfully' });
                }
                else {
                    return res.status(404).json({
                        status: 404,
                        message: 'Not found'
                    });
                }
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        });
    }
}
exports.matterController = new MatterController();
