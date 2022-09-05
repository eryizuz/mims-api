"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const sequelize_typescript_1 = require("sequelize-typescript");
const contact_model_1 = require("../models/contact.model");
const contact_profile_model_1 = require("../models/contact.profile.model");
const custom_field_model_1 = require("../models/custom.field.model");
const matter_model_1 = require("../models/matter.model");
const profile_model_1 = require("../models/profile.model");
const set_custom_field_model_1 = require("../models/set.custom.field.model");
const token_model_1 = require("../models/token.model");
const user_model_1 = require("../models/user.model");
const verification_code_model_1 = require("../models/verification.code.model");
const database = new sequelize_typescript_1.Sequelize((_a = process.env) === null || _a === void 0 ? void 0 : _a.DB_DATABASE, (_b = process.env) === null || _b === void 0 ? void 0 : _b.DB_USERNAME, process.env.DB_PASSWORD, {
    host: (_c = process.env) === null || _c === void 0 ? void 0 : _c.DB_HOST,
    dialect: 'postgres',
    models: [
        user_model_1.User,
        profile_model_1.Profile,
        token_model_1.Token,
        verification_code_model_1.VerificationCode,
        contact_model_1.Contact,
        contact_profile_model_1.ContactProfile,
        set_custom_field_model_1.SetCustomField,
        custom_field_model_1.CustomField,
        matter_model_1.Matter
    ]
});
exports.default = database;
