import {Table, Column, Model, HasMany, DataType, HasOne, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { CustomField } from './custom.field.model';
import { User } from './user.model';
@Table({
    timestamps: true
})
export class SetCustomField extends Model{
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
    @ForeignKey(() => User) @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) UserId!:number;
    @BelongsTo(() => User ) User!: User;
    @HasMany(() => CustomField ) custom_fields!: CustomField[];
}