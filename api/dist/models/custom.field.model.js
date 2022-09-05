"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomField = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const set_custom_field_model_1 = require("./set.custom.field.model");
const user_model_1 = require("./user.model");
let CustomField = class CustomField extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true
    })
], CustomField.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], CustomField.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], CustomField.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], CustomField.prototype, "deleted", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: true
    })
], CustomField.prototype, "content", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], CustomField.prototype, "UserId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => set_custom_field_model_1.SetCustomField),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    })
], CustomField.prototype, "SetCustomFieldId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => set_custom_field_model_1.SetCustomField)
], CustomField.prototype, "SetCustomField", void 0);
CustomField = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true
    })
], CustomField);
exports.CustomField = CustomField;
