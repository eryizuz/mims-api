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
exports.contactController = void 0;
const contact_model_1 = require("../models/contact.model");
const contact_profile_model_1 = require("../models/contact.profile.model");
class ContactController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let contacts = [];
                if (req.user.role < 2) {
                    contacts = yield contact_model_1.Contact.findAll({
                        where: {
                            deleted: 0
                        },
                        include: [
                            { model: contact_profile_model_1.ContactProfile },
                        ]
                    });
                }
                else {
                    contacts = yield contact_model_1.Contact.findAll({
                        where: {
                            deleted: 0,
                            UserId: req.user.sub
                        },
                        include: [
                            { model: contact_profile_model_1.ContactProfile },
                        ]
                    });
                }
                return res.status(201).json({ status: 201, data: contacts });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error'
                });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let contact;
                if (req.user.role < 2) {
                    contact = yield contact_model_1.Contact.findOne({
                        where: {
                            deleted: 0,
                            id: req.params.id
                        },
                        include: [
                            { model: contact_profile_model_1.ContactProfile },
                        ]
                    });
                }
                else {
                    contact = yield contact_model_1.Contact.findOne({
                        where: {
                            deleted: 0,
                            id: req.params.id,
                            UserId: req.user.sub
                        },
                        include: [
                            { model: contact_profile_model_1.ContactProfile },
                        ]
                    });
                }
                if (contact) {
                    return res.status(201).json({ status: 201, data: contact });
                }
                else {
                    return res.status(404).json({ status: 404, message: 'Not found' });
                }
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error'
                });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, is_client, is_company, referral_id, status, prefix, first_name, last_name, middle_name, company_id, title, date_of_birth, emails, phones, websites, addresses, custom_fields } = req.body;
                const contact = yield contact_model_1.Contact.create({
                    type,
                    is_client,
                    is_company,
                    referral_id,
                    status,
                    deleted: 0,
                    UserId: req.user.sub
                });
                const profile = yield contact_profile_model_1.ContactProfile.create({
                    prefix,
                    first_name,
                    last_name,
                    middle_name,
                    company_id,
                    title,
                    date_of_birth,
                    emails: JSON.stringify(emails),
                    phones: JSON.stringify(phones),
                    websites: JSON.stringify(websites),
                    addresses: JSON.stringify(addresses),
                    deleted: 0,
                    ContactId: contact.id
                });
                contact.Profile = profile;
                return res.status(200).json({ status: 200, data: contact, message: 'Contact saved Successfully' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error'
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type, is_client, is_company, referral_id, status, prefix, first_name, last_name, middle_name, company_id, title, date_of_birth, emails, phones, websites, addresses, custom_fields } = req.body;
                const contact = yield contact_model_1.Contact.findOne({
                    where: {
                        id: req.params.id,
                        deleted: 0,
                    }
                });
                const profile = yield contact_profile_model_1.ContactProfile.findOne({
                    where: {
                        contact_id: contact.id,
                        deleted: 0,
                    }
                });
                if ((req.user.role > 1) && (req.user.sub != contact.UserId))
                    return res.status(401).json({
                        status: 401,
                        message: 'Not authorized'
                    });
                yield (contact === null || contact === void 0 ? void 0 : contact.update({
                    type,
                    is_client,
                    is_company,
                    referral_id,
                    status
                }));
                yield (profile === null || profile === void 0 ? void 0 : profile.update({
                    prefix,
                    first_name,
                    last_name,
                    middle_name,
                    company_id,
                    title,
                    date_of_birth,
                    emails: JSON.stringify(emails),
                    phones: JSON.stringify(phones),
                    websites: JSON.stringify(websites),
                    addresses: JSON.stringify(addresses),
                }));
                return res.status(201).json({ status: 201, message: 'Contact updated successfully' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error'
                });
            }
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contact_model_1.Contact.findOne({
                    where: {
                        id: req.params.id,
                        deleted: 0,
                    }
                });
                const profile = yield contact_profile_model_1.ContactProfile.findOne({
                    where: {
                        ContactId: contact.id,
                        deleted: 0,
                    }
                });
                if ((req.user.role > 1) && (req.user.sub != contact.UserId))
                    return res.status(401).json({
                        status: 401,
                        message: 'Not authorized'
                    });
                yield (contact === null || contact === void 0 ? void 0 : contact.update({
                    deleted: 1
                }));
                yield (profile === null || profile === void 0 ? void 0 : profile.update({
                    deleted: 1
                }));
                return res.status(201).json({ status: 201, message: 'Contact deleted successfully' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error'
                });
            }
        });
    }
    clients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let clients = [];
                if (req.user.role < 2) {
                    clients = yield contact_model_1.Contact.findAll({
                        where: {
                            deleted: 0,
                            is_client: 1
                        },
                        include: [
                            { model: contact_profile_model_1.ContactProfile },
                        ]
                    });
                }
                else {
                    clients = yield contact_model_1.Contact.findAll({
                        where: {
                            deleted: 0,
                            UserId: req.user.sub,
                            is_client: 1
                        },
                        include: [
                            { model: contact_profile_model_1.ContactProfile },
                        ]
                    });
                }
                return res.status(201).json({ status: 201, data: clients });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error'
                });
            }
        });
    }
}
exports.contactController = new ContactController();
