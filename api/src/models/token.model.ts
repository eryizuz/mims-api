import {Table, Column, Model, HasMany, DataType, HasOne, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { User } from './user.model';
@Table({
    timestamps: true
})
export class Token extends Model{
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    }) user_agent!:string;
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    }) ip!:string;
    @Column({
        type: DataType.TEXT,
        allowNull: true,
    }) token!:string;
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    }) deleted!:number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    }) is_revoked!:number;
    @ForeignKey(() => User) @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) UserId!:number;
    @BelongsTo(() => User ) User!: User;
}