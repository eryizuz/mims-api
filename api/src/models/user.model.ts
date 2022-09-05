import {Table, Column, Model, HasMany, DataType, HasOne} from 'sequelize-typescript';
import * as uid from "uuid";
import * as bcrypt from 'bcrypt';
import { Profile } from './profile.model';
import { Token } from './token.model';
import { VerificationCode } from './verification.code.model';
import { Matter } from './matter.model';
@Table({
    timestamps: true
})
export class User extends Model{
    @Column({
        type: DataType.STRING(36),
        allowNull: true
     }) uuid!:string;
     @Column({
         type: DataType.STRING(50),
         allowNull: true,
         unique: true
     }) email!:string;
     @Column({
        type: DataType.STRING(50),
        allowNull: true,
        unique: true
    }) username!:string;
    @Column({
        type: DataType.STRING(200),
        allowNull: true
    }) password!:string;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) role!:number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) deleted!:number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) verified!:number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) type!:number;
    @HasOne(() => Profile ) Profile!:Profile;
    @HasMany(() => Token ) Tokens!: Token[];
    @HasMany(() => VerificationCode ) Codes!: VerificationCode[]
    @HasMany(() => Matter ) Matters!: Matter[];
}