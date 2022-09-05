"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const contact_profile_model_1 = require("./contact.profile.model");
const matter_model_1 = require("./matter.model");
const user_model_1 = require("./user.model");
let Contact = class Contact extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(36),
        allowNull: true
    })
], Contact.prototype, "uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], Contact.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], Contact.prototype, "is_client", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], Contact.prototype, "is_company", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], Contact.prototype, "referral_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], Contact.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], Contact.prototype, "deleted", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], Contact.prototype, "UserId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User)
], Contact.prototype, "User", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => contact_profile_model_1.ContactProfile)
], Contact.prototype, "Profile", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => matter_model_1.Matter)
], Contact.prototype, "Matters", void 0);
Contact = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true
    })
], Contact);
exports.Contact = Contact;
