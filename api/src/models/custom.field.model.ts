import {Table, Column, Model, HasMany, DataType, HasOne, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { SetCustomField } from './set.custom.field.model';
import { User } from './user.model';
@Table({
    timestamps: true
})
export class CustomField extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: true
    }) name!: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) status!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) type!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) deleted!: number;
    @Column({
        type: DataType.TEXT,
        allowNull: true
    }) content!: string;
    @ForeignKey(() => User) @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) UserId!:number; 
       
    @ForeignKey(() => SetCustomField) @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) SetCustomFieldId!:number;
    @BelongsTo(() => SetCustomField ) SetCustomField!: SetCustomField;
}