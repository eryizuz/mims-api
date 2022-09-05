import {Table, Column, Model, HasMany, DataType, HasOne, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { User } from './user.model';
@Table({
    timestamps: true
})
export class Profile extends Model{
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    }) first_name!:string; // Firstname

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
    }) middle_name!:string; // Middlename

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    }) last_name!:string; // lastname

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
    }) time_zone!:string; // Timezone
    
    @Column({
        type: DataType.STRING(100),
        allowNull: true,
    }) locate!:string; // locate

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
    }) initial!:string; // initial

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    }) address!:string; // Address
    
    @Column({
        type: DataType.STRING(40),
        allowNull: true,
    }) city!:string; // City

    @Column({
        type: DataType.STRING(40),
        allowNull: true,
    }) state!:string; // State

    // @Column({
    //     type: DataType.STRING(40),
    //     allowNull: true,
    // }) source!:string; // Source

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    }) country!:string; // Country

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    }) postal_code!:string; // Postal code
    
    @Column({
        type: DataType.STRING(254),
        allowNull: false,
    }) phone_number!: string; // Phone number
 
    @Column({
        type: DataType.DECIMAL(10,2),
        allowNull: true,
    }) billing_rate!: string; // Billing Rate

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
    }) job_title!:string; // Job title

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    }) profile_picture!:string; // Profile picture

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    }) email_addresses!:string; // Email addresses

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    }) availability!:string; // Availability

    @Column({
        type: DataType.STRING(100),
        allowNull: true,
    }) date_of_birth!:Date; // Date of birth

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    }) deleted!:number; // Deleted

    @ForeignKey(() => User) @Column({
        type: DataType.INTEGER,
        allowNull: true
    }) UserId!:number; // Foreign key: UserId
    @BelongsTo(() => User ) User!: User;
}