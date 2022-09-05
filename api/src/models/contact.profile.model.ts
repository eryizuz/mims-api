import {Table, Column, Model, HasMany, DataType, HasOne, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Contact } from './contact.model';

@Table({
    timestamps: true
})
export class ContactProfile extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: true
    }) prefix!: string;
    @Column({
        type: DataType.STRING,
        allowNull: true
    }) first_name!: string;
    @Column({
        type: DataType.STRING,
        allowNull: true
    }) last_name!: string;
    @Column({
        type: DataType.STRING,
        allowNull: true
        
    }) middle_name!: string;
    @Column({
        type: DataType.INTEGER,
        allowNull: true
        
    }) company_id!: number;
    @Column({
        type: DataType.STRING,
        allowNull: true
    }) title!: string;
    @Column({
        type: DataType.DATE,
        allowNull: true
    }) date_of_birth!: Date;
    @Column({
        allowNull: true,
        type: DataType.TEXT
    }) emails!: string;
    @Column({
        allowNull: true,
        type: DataType.TEXT
    }) phones!: string;
    @Column({
        allowNull: true,
        type: DataType.TEXT
    }) websites!: string;
    @Column({
        allowNull: true,
        type: DataType.TEXT
    }) addresses!: string;
    @Column({
        allowNull: true,
        type: DataType.TEXT
    }) custom_fields!: string;
    @Column({
        allowNull: true,
        type: DataType.TEXT
    }) avatar!: string;
    @Column({
        allowNull: true,
        type: DataType.TEXT
    }) cover!: string;
    @Column({
        allowNull: true,
        type: DataType.INTEGER
    }) deleted!: number;
    @ForeignKey(() => Contact) @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) ContactId!:number;
    @BelongsTo(() => Contact ) Contact!: Contact;
}