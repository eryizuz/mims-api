"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const profile_model_1 = require("./profile.model");
const token_model_1 = require("./token.model");
const verification_code_model_1 = require("./verification.code.model");
const matter_model_1 = require("./matter.model");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(36),
        allowNull: true
    })
], User.prototype, "uuid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
        unique: true
    })
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
        unique: true
    })
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: true
    })
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], User.prototype, "deleted", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], User.prototype, "verified", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], User.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => profile_model_1.Profile)
], User.prototype, "Profile", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => token_model_1.Token)
], User.prototype, "Tokens", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => verification_code_model_1.VerificationCode)
], User.prototype, "Codes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => matter_model_1.Matter)
], User.prototype, "Matters", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true
    })
], User);
exports.User = User;
