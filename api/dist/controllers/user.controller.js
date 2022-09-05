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
exports.userController = void 0;
const user_model_1 = require("../models/user.model");
const token_model_1 = require("../models/token.model");
const profile_model_1 = require("../models/profile.model");
const uid = __importStar(require("uuid"));
const bcrypt = __importStar(require("bcrypt"));
class UserController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.User.findAll({
                    where: { deleted: 0 },
                    attributes: [
                        'id',
                        'uuid',
                        'username',
                        'email',
                        'role',
                        'verified',
                        'type'
                    ],
                    include: [
                        { model: token_model_1.Token },
                        { model: profile_model_1.Profile }
                    ]
                });
                return res.status(201).json({ status: 201, data: users });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        });
    }
    store(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) > 1)
                    return res.status(401).json({ status: 401, message: 'Not authorized' });
                let { first_name, middle_name, last_name, email, username, password, role } = req.body;
                password = yield bcrypt.hashSync(password, 10);
                let uuid = yield uid.v4();
                const user = yield user_model_1.User.create({
                    email: email,
                    username: username,
                    password: password,
                    deleted: 0,
                    verified: 0,
                    type: 1,
                    role: role,
                    uuid: uuid
                });
                const profile = yield profile_model_1.Profile.create({
                    first_name: first_name,
                    last_name: last_name,
                    middle_name: middle_name,
                    UserId: user === null || user === void 0 ? void 0 : user.id,
                    deleted: 0
                });
                user.Profile = profile;
                return res.status(200).json({ status: 200, data: user, message: 'Registred Successfully' });
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
                const id = req.params.id;
                const user = yield user_model_1.User.findOne({
                    where: {
                        id,
                        deleted: 0
                    },
                    include: [
                        { model: token_model_1.Token },
                        { model: profile_model_1.Profile }
                    ]
                });
                return res.status(201).json({ status: 201, data: user });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        });
    }
    update(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                console.log(req.body);
                const { first_name, middle_name, last_name, date_of_birth, address, state, city, postal_code, country } = req.body;
                let { email, username, password, role, verified, type } = req.body;
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) > 1 && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.sub) != req.params.id)
                    return res.status(401).json({ status: 401, message: 'Not authorized' });
                const user = yield user_model_1.User.update({
                    email: email,
                    username: username,
                    role: role,
                    verified: verified,
                    type: type
                }, {
                    where: {
                        id: req.params.id,
                        deleted: 0
                    }
                });
                const profile = yield profile_model_1.Profile.update({
                    first_name: first_name,
                    last_name: last_name,
                    date_of_birth: date_of_birth,
                    address: address,
                    state: state,
                    city: city,
                    postal_code: postal_code,
                    country: country
                }, {
                    where: {
                        UserId: req.params.id,
                        deleted: 0
                    }
                });
                return res.status(201).json({ status: 201, message: 'User updated successfully' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        });
    }
    destroy(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const profile = yield profile_model_1.Profile.findOne({
                    where: {
                        UserId: id,
                        deleted: 0
                    }
                });
                const user = yield user_model_1.User.findOne({
                    where: {
                        id,
                        deleted: 0
                    }
                });
                if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) > 1 && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.sub) != (user === null || user === void 0 ? void 0 : user.id))
                    return res.status(401).json({ status: 401, message: 'Not authorized' });
                yield (user === null || user === void 0 ? void 0 : user.update({
                    deleted: 1
                }));
                yield (profile === null || profile === void 0 ? void 0 : profile.update({
                    deleted: 1
                }));
                return res.status(201).json({ status: 201, message: 'User deleted successfully' });
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ status: 500, message: 'Internal Server Error' });
            }
        });
    }
}
exports.userController = new UserController();
