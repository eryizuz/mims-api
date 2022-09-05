import {Table, Column, Model, HasMany, DataType, HasOne, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { ContactProfile } from './contact.profile.model';
import { Matter } from './matter.model';
import { User } from './user.model';
@Table({
    timestamps: true
})
export class Contact extends Model{
    @Column({
        type: DataType.STRING(36),
        allowNull: true
     }) uuid!:string;
     @Column({
         type: DataType.INTEGER,
         allowNull: true
     }) type!: number;
     @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) is_client!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) is_company!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) referral_id!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) status!: number;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) deleted!: number;
    @ForeignKey(() => User) @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) UserId!:number;
    @BelongsTo(() => User ) User!: User;
    @HasOne(() => ContactProfile ) Profile!:ContactProfile;
    @HasMany(() => Matter ) Matters!: Matter[];
}