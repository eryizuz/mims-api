import {Table, Column, Model, HasMany, DataType, HasOne, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { User } from './user.model';
@Table({
    timestamps: true
})
export class VerificationCode extends Model{
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) code!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) is_revoked!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) is_used!: number;
    @ForeignKey(() => User) @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) UserId!:number;
    @BelongsTo(() => User ) User!: User;
}