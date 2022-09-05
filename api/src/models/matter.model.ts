import {Table, Column, Model, HasMany, DataType, HasOne, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { User } from './user.model';
import { Contact } from './contact.model';
@Table({
    timestamps: true
})
export class Matter extends Model{
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
    }) status!: number;
    @Column({
        type: DataType.TEXT,
        allowNull: true
    }) permissions!: string;
    @Column({
        type: DataType.TEXT,
        allowNull: true
    }) practice_area!: string;
    @Column({
        type: DataType.TEXT,
        allowNull: true
    }) description!: string;
    @Column({
        type: DataType.TEXT,
        allowNull: true
     }) responsible_attorney!:string;
     @Column({
        type: DataType.TEXT,
        allowNull: true
     }) originating_attorney!:string;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) deleted!: number;
    @Column({
        type: DataType.DATE,
        allowNull: true
    }) open_date!: Date;
    @Column({
        type: DataType.STRING,
        allowNull: true
    }) client_reference_number!:string;
    @Column({
        type: DataType.STRING,
        allowNull: true
    }) location!:string;
    @Column({
        type: DataType.DATE,
        allowNull: true
    }) closed_date!: Date;
    @Column({
        type: DataType.DATE,
        allowNull: true
    }) pending_date!: Date;
    @Column({
        type: DataType.DATE,
        allowNull: true
    }) limitations_date!: Date;

    @Column({
        type: DataType.TEXT,
        allowNull: true
     }) relationship!:string;
     @Column({
        allowNull: true,
        type: DataType.TEXT
    }) custom_fields!: string;
    @Column({
        allowNull: true,
        type: DataType.TEXT
    }) set_custom_fields!: string;
    @Column({
        allowNull: true,
        type: DataType.TEXT
    }) billing_preferences!: string;
    @Column({
        allowNull: true,
        type: DataType.TEXT
    }) task_automation!: string;
    @ForeignKey(() => Contact) @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) ClientId!:number;
    @BelongsTo(() => Contact ) Client!: Contact;
    @ForeignKey(() => User) @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) UserId!:number;
    @BelongsTo(() => User ) User!: User;
}