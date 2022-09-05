import {Table, Column, Model, HasMany, DataType, HasOne, ForeignKey, BelongsTo} from 'sequelize-typescript';
@Table({
    timestamps: true
})
export class Company extends Model{}