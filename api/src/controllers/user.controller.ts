import { Request, response, Response } from 'express';
import  { User } from '../models/user.model';
import { Token } from '../models/token.model';
import { Profile } from '../models/profile.model';
import * as uid from "uuid";
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import Mail = require('nodemailer/lib/mailer');
import SMTPTransport = require('nodemailer/lib/smtp-transport');
import { transporter } from '../config/smtp';
import { Op } from 'sequelize';
import { createToken } from '../helpers/getToken';

class UserController{
    public async index( req: any, res: Response){
        try{
            const users = await User.findAll({
                where:{  deleted: 0 },
                attributes:[
                    'id',
                    'uuid',
                    'username',
                    'email',
                    'role',
                    'verified',
                    'type'
                ],
                include: [
                    { model: Token },
                    { model: Profile }
                ]
            });
            return res.status(201).json({ status: 201, data: users});  
        }catch(e){
            console.log(e)
            return res.status(500).json({ status: 500, message: 'Internal Server Error'})
        }
    }
    public async store( req: any, res: Response){
        try{
            if ( req.user?.role > 1 ) return res.status(401).json({ status: 401, message: 'Not authorized'})
            let { first_name, middle_name, last_name, email, username, password, role } = req.body;
            password = await bcrypt.hashSync(password, 10);
            let uuid = await uid.v4();
            const user = await User.create({
                email: email,
                username: username,
                password: password,
                deleted: 0,
                verified: 0,
                type: 1,
                role: role,
                uuid: uuid
             });
             const profile = await Profile.create({
                 first_name: first_name,
                 last_name: last_name,
                 middle_name: middle_name,
                 UserId: user?.id,
                 deleted: 0
             });
             user.Profile = profile;
             return res.status(200).json({ status: 200, data: user, message: 'Registred Successfully'});
        }catch(e){
            console.log(e)
            return res.status(500).json({ status: 500, message: 'Internal Server Error'})
        }
    }
    public async show( req: any, res: Response){
        try{
            const id = req.params.id;
            const user = await User.findOne({
                where:{
                    id,
                    deleted: 0
                },
                include:[
                    { model: Token },
                    { model: Profile }
                ]
            })
            return res.status(201).json({ status: 201, data: user })
        }catch(e){
            console.log(e)
            return res.status(500).json({ status: 500, message: 'Internal Server Error'})
        }
    }
    public async update( req: any, res: Response){
        try{
            const id = req.params.id;
            console.log(req.body )
            const { first_name, middle_name, last_name, date_of_birth, address, state, city, postal_code, country } = req.body;
            let { email, username, password, role, verified, type } = req.body;

            if ( req.user?.role > 1 && req.user?.sub != req.params.id) return res.status(401).json({ status: 401, message: 'Not authorized'})
            const user = await User.update(
                {
                    email: email,
                    username: username,
                    role: role,
                    verified: verified,
                    type: type
                },
                {
                    where: {
                        id: req.params.id,
                        deleted: 0
                    }
                });
            const profile = await Profile.update({
                first_name: first_name,
                last_name: last_name,
                date_of_birth: date_of_birth,
                address: address,
                state: state,
                city: city,
                postal_code: postal_code,
                country: country
            },{
                where: {
                    UserId: req.params.id,
                    deleted: 0
                }
            })
            return res.status(201).json({ status: 201, message: 'User updated successfully' })
        }catch(e){
            console.log(e)
            return res.status(500).json({ status: 500, message: 'Internal Server Error'})
        }
    }
    public async destroy( req: any, res: Response){
        try{
            const id = req.params.id;
            const profile = await Profile.findOne({
                where:{
                    UserId: id,
                    deleted: 0
                }
            })
            const user = await User.findOne({
                where:{
                    id,
                    deleted: 0
                }
            })
            if ( req.user?.role > 1 && req.user?.sub != user?.id) return res.status(401).json({ status: 401, message: 'Not authorized'})
            await user?.update({
                deleted: 1
            })
            await profile?.update({
                deleted: 1
            })
            return res.status(201).json({ status: 201, message: 'User deleted successfully'})
        }catch(e){
            console.log(e)
            return res.status(500).json({ status: 500, message: 'Internal Server Error'})
        }
    }
}
export const userController = new UserController();