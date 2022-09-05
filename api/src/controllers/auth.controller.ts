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
import 'dotenv/config';
import { VerificationCode } from '../models/verification.code.model';


class AuthController{
    public async login(req: any, res: Response){
       try{
            const { login } = req.body;
            console.log(req )
            // Validate email and username if exists in the db.
            const user = await User.findOne({
                where:{
                	[Op.or]:[{username: login},{email: login}]
                }
            })
            // if user does not exists
            if (!user ) return res.status(401).json({ status: 404, message: 'Server internal error'});
            // if exists validate hash password and create token
            if ( await bcrypt.compareSync(req.body.password, user.password)){
                const bearer = await createToken(user, res);
                const token = await Token.create({
                    token: bearer,
                    ip: req.ip,
                    user_agent: req.headers['user-agent'],
                    UserId: user.id,
                    deleted: 0,
                    is_revoked: 0,
                })
                // Once created validad if already exists
                let xser = await User.findOne({
                    where:{
                        id: user.id
                    },
                    attributes:[
                        'id',
                        'role',
                        'type',
                        'email',
                        'username',
                        'verified'
                    ],
                    include:[
                        { model: Profile }//,
                       // { model: Token }
                    ]
                });
            return res.status(201).json({ status: 201, message: 'Login Successfully', token: token, data: xser})
            }else{
                return res.status(404).json({ status: 401, message: 'Not authorized'})
            }
            return res.status(200).json({ status: 200, data: user, token: Token, message: 'Login Successfully'});
       }catch(e){
            console.log(e)
            return res.status(500).json({ status: 500, message: 'Something is not right'})
        }

    }
    public async register(req: Request, res: Response){
        try{
             let { first_name, middle_name, last_name, email, username, password, phone_number } = req.body;
             password = await bcrypt.hashSync(password, 10);
             let uuid = await uid.v4();
             const user = await User.create({
                uuid: uuid,
                email: email,
                username: username,
                password: password,
                role: 2,
                deleted: 0,
                verified: 0,
                type: 1,
                //middle_name: middle_name
             });
             const profile = await Profile.create({
                 first_name: first_name,
                 middle_name: middle_name,
                 last_name: last_name,
                 UserId: user?.id,
                 phone_number: phone_number
             });
             user.Profile = profile;
             if (user && profile ){
                 //Generate and save to the db a verification code
                 const code = Math.floor(100000+Math.random()*900000);
                 const secure_code = await VerificationCode.create({
                     UserId: user?.id,
                     is_revoked: 0,
                     code: code,
                     is_used: 0
                 });
                 const mailOptions: Mail.Options = {
                    from: '"Mims team" <no-reply@mims.com>', // sender address
                    to: user.email, // list of receivers
                    subject: 'Verification code for Mims', // Subject line
                    text: 'Verification code for Mims', // plain text body
                    // '<a href="'+process.env?.APP_URL+'/verify/'+user.uuid+'">Verificar cuenta</a>'
                    html:`
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Document</title>
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                        <link
                            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap"
                            rel="stylesheet"
                        />
                        <style>
                            html,
                            body {
                                height: 100%;
                                width: 100%;
                                padding: 0;
                                margin: 0 auto;
                                background-color: rgb(242, 242, 242);
                                font-family: "Poppins", sans-serif;
                            }
                            .container {
                                margin: 0 auto;
                                height: 100%;
                                width: 550px;
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                            }
                            .container > * + * {
                                margin-top: 30px;
                            }
                            .email {
                                width: 100%;
                                background-color: white;
                            }
                            .email-content {
                                padding: 20px 40px;
                            }
                            img {
                                width: 100%;
                            }
                            .greeting {
                                color: rgba(0, 95, 191, 1);
                            }
                            .last-words {
                                color: rgba(0, 53, 107, 1);
                                font-weight: bolder;
                            }
                            button {
                                padding: 12px 24px;
                                color: white;
                                background-color: rgba(0, 53, 107, 1);
                                border: none;
                                font-family: "Poppins", sans-serif;
                                font-size: medium;
                                font-weight: 500;
                            }
                            a {
                                text-decoration: underline;
                                color: rgba(0, 95, 191, 1);
                            }
                            footer {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                font-weight: 500;
                                color: rgb(51, 55, 56);
                            }
                            footer > * + * {
                                margin-top: 30px;
                            }
                            footer div {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                                font-weight: 500;
                            }
                            .social-media {
                                width: 200px;
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                align-items: center;
                                color: rgb(189, 189, 189);
                            }
                            .social-media > * {
                                width: 40px;
                            }
                            .social-media > * + * {
                                margin-left: 20px;
                            }
                            .mims-logo-container {
                                width: 200px;
                            }
                        </style>
                    </head>
                    <body>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="image-container">
                                            <img
                                                src="https://i.pinimg.com/originals/ba/d7/9c/bad79c919aab447e74f0c2372b9126ba.jpg"
                                                alt=""
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="email-content">
                                            <h3 class="greeting">Hi ${ profile.first_name + ' ' + profile.last_name },</h3>
                                            <p class="info">
                								You have requested to <strong>register your account</strong>, to
                								finish this process copy your secure code.
                							</p>
                                            <span style="padding:15px; border-radius:15px; background-color:#f5f5f5;color:#000000; font-size:25px;">${ code }</span>
                                            
                                            <p>If you have any problems, contact with help@mims.com.</p>
                                            <p class="last-words">Thank you,<br />Mims Team</p>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <footer>
                                            <div class="mims-logo-container">
                                                <img
                                                    src="https://i.pinimg.com/originals/5c/2e/24/5c2e24775ea7bf378556faf65f55212b.jpg"
                                                    alt="mims-logo"
                                                />
                                            </div>
                                            <div>
                                                <small>Copyright 2022 - Mims</small>
                                                <small
                                                    >8180 NW 36 Street, Suite 420 Miami, Florida 33166</small
                                                >
                                            </div>
                                            <div>
                                                <small>
                                                    You are receiving this email because you registered in Mims
                                                    software
                                                </small>
                                                <small>
                                                    if you don't remember to have registered, please click <a href="www.app.mims.com">here</a>
                                                    
                                                </small>
                                            </div>
                                            <div class="social-media">
                                                <div>
                                                    <svg
                                                        width="48"
                                                        height="48"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM26.5016 25.0542V38.1115H21.0991V25.0547H18.4V20.5551H21.0991V17.8536C21.0991 14.1828 22.6231 12 26.9532 12H30.5581V16.5001H28.3048C26.6192 16.5001 26.5077 17.1289 26.5077 18.3025L26.5016 20.5546H30.5836L30.1059 25.0542H26.5016Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <svg
                                                        width="48"
                                                        height="48"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM18.7233 11.2773C20.0886 11.2152 20.5249 11.2 24.0012 11.2H23.9972C27.4746 11.2 27.9092 11.2152 29.2746 11.2773C30.6373 11.3397 31.5679 11.5555 32.384 11.872C33.2266 12.1987 33.9386 12.636 34.6506 13.348C35.3627 14.0595 35.8 14.7736 36.128 15.6155C36.4427 16.4294 36.6587 17.3595 36.7227 18.7222C36.784 20.0876 36.8 20.5238 36.8 24.0001C36.8 27.4764 36.784 27.9116 36.7227 29.277C36.6587 30.6391 36.4427 31.5695 36.128 32.3837C35.8 33.2253 35.3627 33.9394 34.6506 34.6509C33.9394 35.3629 33.2264 35.8013 32.3848 36.1283C31.5703 36.4448 30.6391 36.6605 29.2765 36.7229C27.9111 36.7851 27.4762 36.8003 23.9996 36.8003C20.5236 36.8003 20.0876 36.7851 18.7222 36.7229C17.3598 36.6605 16.4294 36.4448 15.615 36.1283C14.7736 35.8013 14.0595 35.3629 13.3483 34.6509C12.6365 33.9394 12.1992 33.2253 11.872 32.3834C11.5557 31.5695 11.34 30.6394 11.2773 29.2767C11.2155 27.9114 11.2 27.4764 11.2 24.0001C11.2 20.5238 11.216 20.0873 11.2771 18.7219C11.3384 17.3598 11.5544 16.4294 11.8717 15.6152C12.1997 14.7736 12.6371 14.0595 13.3491 13.348C14.0606 12.6363 14.7747 12.1989 15.6166 11.872C16.4305 11.5555 17.3606 11.3397 18.7233 11.2773Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M22.853 13.5067C23.0759 13.5064 23.3158 13.5065 23.5746 13.5066L24.0013 13.5067C27.4189 13.5067 27.824 13.519 29.1736 13.5803C30.4216 13.6374 31.0989 13.8459 31.5501 14.0211C32.1475 14.2531 32.5733 14.5305 33.0211 14.9785C33.4691 15.4265 33.7464 15.8532 33.979 16.4505C34.1542 16.9012 34.363 17.5785 34.4198 18.8265C34.4811 20.1759 34.4944 20.5812 34.4944 23.9972C34.4944 27.4133 34.4811 27.8186 34.4198 29.168C34.3627 30.416 34.1542 31.0933 33.979 31.544C33.747 32.1413 33.4691 32.5667 33.0211 33.0144C32.5731 33.4624 32.1477 33.7398 31.5501 33.9718C31.0995 34.1478 30.4216 34.3558 29.1736 34.4128C27.8242 34.4742 27.4189 34.4875 24.0013 34.4875C20.5834 34.4875 20.1783 34.4742 18.8289 34.4128C17.5809 34.3552 16.9036 34.1467 16.4521 33.9715C15.8548 33.7395 15.4281 33.4621 14.9801 33.0141C14.5321 32.5661 14.2548 32.1405 14.0222 31.5429C13.847 31.0923 13.6382 30.4149 13.5814 29.1669C13.5201 27.8176 13.5078 27.4122 13.5078 23.994C13.5078 20.5759 13.5201 20.1727 13.5814 18.8233C13.6385 17.5753 13.847 16.898 14.0222 16.4468C14.2542 15.8494 14.5321 15.4228 14.9801 14.9748C15.4281 14.5268 15.8548 14.2494 16.4521 14.0169C16.9033 13.8409 17.5809 13.6329 18.8289 13.5755C20.0097 13.5222 20.4674 13.5062 22.853 13.5035V13.5067ZM30.8339 15.6321C29.9859 15.6321 29.2978 16.3193 29.2978 17.1676C29.2978 18.0156 29.9859 18.7036 30.8339 18.7036C31.6819 18.7036 32.3699 18.0156 32.3699 17.1676C32.3699 16.3196 31.6819 15.6316 30.8339 15.6316V15.6321ZM17.4279 24.0002C17.4279 20.3701 20.3709 17.4269 24.001 17.4268C27.6312 17.4268 30.5736 20.37 30.5736 24.0002C30.5736 27.6304 27.6314 30.5723 24.0013 30.5723C20.3711 30.5723 17.4279 27.6304 17.4279 24.0002Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M24.0012 19.7334C26.3575 19.7334 28.2679 21.6436 28.2679 24.0001C28.2679 26.3564 26.3575 28.2668 24.0012 28.2668C21.6447 28.2668 19.7345 26.3564 19.7345 24.0001C19.7345 21.6436 21.6447 19.7334 24.0012 19.7334Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <svg
                                                        width="48"
                                                        height="48"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM23.3316 20.338L23.2812 19.5075C23.1301 17.3551 24.4563 15.3891 26.5548 14.6265C27.327 14.3553 28.6364 14.3214 29.4926 14.5587C29.8283 14.6604 30.4663 14.9993 30.9195 15.3044L31.7421 15.8637L32.6486 15.5756C33.1523 15.423 33.8238 15.1688 34.1259 14.9993C34.4113 14.8468 34.6631 14.762 34.6631 14.8129C34.6631 15.101 34.042 16.084 33.5216 16.6263C32.8165 17.389 33.018 17.4568 34.4449 16.9483C35.3011 16.6602 35.3178 16.6602 35.15 16.9822C35.0492 17.1517 34.5288 17.7449 33.9748 18.2872C33.0347 19.2194 32.9844 19.3211 32.9844 20.1007C32.9844 21.304 32.4136 23.8123 31.8428 25.1851C30.7852 27.7612 28.5189 30.422 26.2526 31.7609C23.063 33.6422 18.8157 34.1167 15.24 33.0151C14.0481 32.6422 12 31.6931 12 31.5237C12 31.4728 12.6211 31.405 13.3766 31.3881C14.9546 31.3542 16.5326 30.9135 17.8756 30.1339L18.7822 29.5916L17.7413 29.2357C16.264 28.7272 14.9378 27.5578 14.6021 26.4562C14.5013 26.1003 14.5349 26.0833 15.475 26.0833L16.4487 26.0664L15.6261 25.6766C14.6524 25.1851 13.7627 24.3546 13.3262 23.5072C13.0072 22.8971 12.6044 21.3548 12.7219 21.2362C12.7554 21.1854 13.108 21.287 13.5109 21.4226C14.6692 21.8463 14.8203 21.7446 14.1488 21.0328C12.8897 19.7448 12.5036 17.8296 13.108 16.0162L13.3934 15.2027L14.5013 16.3043C16.7677 18.5245 19.4369 19.8465 22.4922 20.2363L23.3316 20.338Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <svg
                                                        width="48"
                                                        height="48"
                                                        viewBox="0 0 48 48"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            clip-rule="evenodd"
                                                            d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM34.0016 15.7493C35.1031 16.0516 35.9706 16.9422 36.265 18.0732C36.8 20.123 36.8 24.4 36.8 24.4C36.8 24.4 36.8 28.6768 36.265 30.7268C35.9706 31.8578 35.1031 32.7484 34.0016 33.0508C32.0054 33.6 24 33.6 24 33.6C24 33.6 15.9946 33.6 13.9983 33.0508C12.8967 32.7484 12.0292 31.8578 11.7348 30.7268C11.2 28.6768 11.2 24.4 11.2 24.4C11.2 24.4 11.2 20.123 11.7348 18.0732C12.0292 16.9422 12.8967 16.0516 13.9983 15.7493C15.9946 15.2 24 15.2 24 15.2C24 15.2 32.0054 15.2 34.0016 15.7493Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M21.6 28.8V20.8L28 24.8001L21.6 28.8Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </footer>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </body>
                </html>
                
                    `
                };
                transporter.sendMail(mailOptions, (err, info: SMTPTransport.SentMessageInfo) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    return res.status(200).json({ status: 200, data: user, message: 'Registred Successfully'});
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                    });
             }else{
                 return res.status(200).json({ status: 403, message: 'User dont save successfully'})
             }
             return res.status(200).json({ status: 200, data: user, message: 'Registred Successfully'});
        }catch(e){
             console.log(e)
             return res.status(500).json({ status: 500, message: 'Algo salio mal'})
         }
 
     }
    public async verify(req: Request, res: Response ){
         try{
            //Verify code
            const { login, code }  = req.body;
            const user = await User.findOne({
                where:{
                	[Op.or]:[{username: login },{email: login }]
                }
            })
            if ( !user ) return res.status(404).json({status: 404, message: 'Not found'})
            const v_code = await VerificationCode.findOne({
                where:{
                    [Op.and ]:[{ is_used: 0}, {is_revoked: 0}, { code: code }, { UserId: user?.id }]
                }
            });
            if ( v_code ){
                user.verified = 1;
                await user.save();
                v_code.is_used = 1;
                await v_code.save()
                return res.status(201).json({ status: 201, message: 'Verification successfully' })
            }else{
                return res.status(401).json({ status: 401, message: 'Not authorized'})
            }
         }catch(e){
            console.log(e)
            return res.status(500).json({ status: 500, message: 'Internal Server Error'})
         }
     }
     public async verification(req: any, res: Response){
         try{
            const user = await User.findOne({
                where:{
                    id: req.user.sub,
                    deleted: 0
                },
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
                    { model: Profile }
                ]
            });
            const code = Math.floor(100000+Math.random()*900000);
            const secure_code = await VerificationCode.create({
                UserId: user.id,
                is_revoked: 0,
                code: code,
                is_used: 0
            });
            const mailOptions: Mail.Options = {
               from: '"Mims team" <no-reply@mims.com>', // sender address
               to: user.email, // list of receivers
               subject: 'Verification code for Mims', // Subject line
               text: 'Verification code for Mims', // plain text body
               // '<a href="'+process.env?.APP_URL+'/verify/'+user.uuid+'">Verificar cuenta</a>'
               html:`
               <html lang="en">
               <head>
                   <meta charset="UTF-8" />
                   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                   <title>Document</title>
                   <link rel="preconnect" href="https://fonts.googleapis.com" />
                   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                   <link
                       href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap"
                       rel="stylesheet"
                   />
                   <style>
                       html,
                       body {
                           height: 100%;
                           width: 100%;
                           padding: 0;
                           margin: 0 auto;
                           background-color: rgb(242, 242, 242);
                           font-family: "Poppins", sans-serif;
                       }
                       .container {
                           margin: 0 auto;
                           height: 100%;
                           width: 550px;
                           display: flex;
                           flex-direction: column;
                           justify-content: center;
                           align-items: center;
                       }
                       .container > * + * {
                           margin-top: 30px;
                       }
                       .email {
                           width: 100%;
                           background-color: white;
                       }
                       .email-content {
                           padding: 20px 40px;
                       }
                       img {
                           width: 100%;
                       }
                       .greeting {
                           color: rgba(0, 95, 191, 1);
                       }
                       .last-words {
                           color: rgba(0, 53, 107, 1);
                           font-weight: bolder;
                       }
                       button {
                           padding: 12px 24px;
                           color: white;
                           background-color: rgba(0, 53, 107, 1);
                           border: none;
                           font-family: "Poppins", sans-serif;
                           font-size: medium;
                           font-weight: 500;
                       }
                       a {
                           text-decoration: underline;
                           color: rgba(0, 95, 191, 1);
                       }
                       footer {
                           display: flex;
                           flex-direction: column;
                           justify-content: center;
                           align-items: center;
                           font-weight: 500;
                           color: rgb(51, 55, 56);
                       }
                       footer > * + * {
                           margin-top: 30px;
                       }
                       footer div {
                           display: flex;
                           flex-direction: column;
                           align-items: center;
                           justify-content: center;
                           font-weight: 500;
                       }
                       .social-media {
                           width: 200px;
                           display: flex;
                           flex-direction: row;
                           justify-content: center;
                           align-items: center;
                           color: rgb(189, 189, 189);
                       }
                       .social-media > * {
                           width: 40px;
                       }
                       .social-media > * + * {
                           margin-left: 20px;
                       }
                       .mims-logo-container {
                           width: 200px;
                       }
                   </style>
               </head>
               <body>
                   <table>
                       <tbody>
                           <tr>
                               <td>
                                   <div class="image-container">
                                       <img
                                           src="https://i.pinimg.com/originals/ba/d7/9c/bad79c919aab447e74f0c2372b9126ba.jpg"
                                           alt=""
                                       />
                                   </div>
                               </td>
                           </tr>
                           <tr>
                               <td>
                                   <div class="email-content">
                                       <h3 class="greeting">Hi ${ user.Profile.first_name + ' ' + user.Profile.last_name },</h3>
                                       <p class="info">
                                           You have requested to <strong>register your account</strong>, to
                                           finish this process copy your secure code.
                                       </p>
                                       <span style="padding:15px; border-radius:15px; background-color:#f5f5f5;color:#000000; font-size:25px;">${ code }</span>
                                       
                                       <p>If you have any problems, contact with help@mims.com.</p>
                                       <p class="last-words">Thank you,<br />Mims Team</p>
                                   </div>
                               </td>
                           </tr>
                           <tr>
                               <td>
                                   <footer>
                                       <div class="mims-logo-container">
                                           <img
                                               src="https://i.pinimg.com/originals/5c/2e/24/5c2e24775ea7bf378556faf65f55212b.jpg"
                                               alt="mims-logo"
                                           />
                                       </div>
                                       <div>
                                           <small>Copyright 2022 - Mims Software</small>
                                           <small
                                               >8180 NW 36 Street, Suite 420 Miami, Florida 33166</small
                                           >
                                       </div>
                                       <div>
                                           <small>
                                               You are receiving this email because you registered in Mims
                                               software
                                           </small>
                                           <small>
                                               if you don't remember to have registered, please <a href="www.app.mims.com">click here</a>
                                               
                                           </small>
                                       </div>
                                       <div class="social-media">
                                           <div>
                                               <svg
                                                   width="48"
                                                   height="48"
                                                   viewBox="0 0 48 48"
                                                   fill="none"
                                                   xmlns="http://www.w3.org/2000/svg"
                                               >
                                                   <path
                                                       fill-rule="evenodd"
                                                       clip-rule="evenodd"
                                                       d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM26.5016 25.0542V38.1115H21.0991V25.0547H18.4V20.5551H21.0991V17.8536C21.0991 14.1828 22.6231 12 26.9532 12H30.5581V16.5001H28.3048C26.6192 16.5001 26.5077 17.1289 26.5077 18.3025L26.5016 20.5546H30.5836L30.1059 25.0542H26.5016Z"
                                                       fill="currentColor"
                                                   />
                                               </svg>
                                           </div>
                                           <div>
                                               <svg
                                                   width="48"
                                                   height="48"
                                                   viewBox="0 0 48 48"
                                                   fill="none"
                                                   xmlns="http://www.w3.org/2000/svg"
                                               >
                                                   <path
                                                       fill-rule="evenodd"
                                                       clip-rule="evenodd"
                                                       d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM18.7233 11.2773C20.0886 11.2152 20.5249 11.2 24.0012 11.2H23.9972C27.4746 11.2 27.9092 11.2152 29.2746 11.2773C30.6373 11.3397 31.5679 11.5555 32.384 11.872C33.2266 12.1987 33.9386 12.636 34.6506 13.348C35.3627 14.0595 35.8 14.7736 36.128 15.6155C36.4427 16.4294 36.6587 17.3595 36.7227 18.7222C36.784 20.0876 36.8 20.5238 36.8 24.0001C36.8 27.4764 36.784 27.9116 36.7227 29.277C36.6587 30.6391 36.4427 31.5695 36.128 32.3837C35.8 33.2253 35.3627 33.9394 34.6506 34.6509C33.9394 35.3629 33.2264 35.8013 32.3848 36.1283C31.5703 36.4448 30.6391 36.6605 29.2765 36.7229C27.9111 36.7851 27.4762 36.8003 23.9996 36.8003C20.5236 36.8003 20.0876 36.7851 18.7222 36.7229C17.3598 36.6605 16.4294 36.4448 15.615 36.1283C14.7736 35.8013 14.0595 35.3629 13.3483 34.6509C12.6365 33.9394 12.1992 33.2253 11.872 32.3834C11.5557 31.5695 11.34 30.6394 11.2773 29.2767C11.2155 27.9114 11.2 27.4764 11.2 24.0001C11.2 20.5238 11.216 20.0873 11.2771 18.7219C11.3384 17.3598 11.5544 16.4294 11.8717 15.6152C12.1997 14.7736 12.6371 14.0595 13.3491 13.348C14.0606 12.6363 14.7747 12.1989 15.6166 11.872C16.4305 11.5555 17.3606 11.3397 18.7233 11.2773Z"
                                                       fill="currentColor"
                                                   />
                                                   <path
                                                       fill-rule="evenodd"
                                                       clip-rule="evenodd"
                                                       d="M22.853 13.5067C23.0759 13.5064 23.3158 13.5065 23.5746 13.5066L24.0013 13.5067C27.4189 13.5067 27.824 13.519 29.1736 13.5803C30.4216 13.6374 31.0989 13.8459 31.5501 14.0211C32.1475 14.2531 32.5733 14.5305 33.0211 14.9785C33.4691 15.4265 33.7464 15.8532 33.979 16.4505C34.1542 16.9012 34.363 17.5785 34.4198 18.8265C34.4811 20.1759 34.4944 20.5812 34.4944 23.9972C34.4944 27.4133 34.4811 27.8186 34.4198 29.168C34.3627 30.416 34.1542 31.0933 33.979 31.544C33.747 32.1413 33.4691 32.5667 33.0211 33.0144C32.5731 33.4624 32.1477 33.7398 31.5501 33.9718C31.0995 34.1478 30.4216 34.3558 29.1736 34.4128C27.8242 34.4742 27.4189 34.4875 24.0013 34.4875C20.5834 34.4875 20.1783 34.4742 18.8289 34.4128C17.5809 34.3552 16.9036 34.1467 16.4521 33.9715C15.8548 33.7395 15.4281 33.4621 14.9801 33.0141C14.5321 32.5661 14.2548 32.1405 14.0222 31.5429C13.847 31.0923 13.6382 30.4149 13.5814 29.1669C13.5201 27.8176 13.5078 27.4122 13.5078 23.994C13.5078 20.5759 13.5201 20.1727 13.5814 18.8233C13.6385 17.5753 13.847 16.898 14.0222 16.4468C14.2542 15.8494 14.5321 15.4228 14.9801 14.9748C15.4281 14.5268 15.8548 14.2494 16.4521 14.0169C16.9033 13.8409 17.5809 13.6329 18.8289 13.5755C20.0097 13.5222 20.4674 13.5062 22.853 13.5035V13.5067ZM30.8339 15.6321C29.9859 15.6321 29.2978 16.3193 29.2978 17.1676C29.2978 18.0156 29.9859 18.7036 30.8339 18.7036C31.6819 18.7036 32.3699 18.0156 32.3699 17.1676C32.3699 16.3196 31.6819 15.6316 30.8339 15.6316V15.6321ZM17.4279 24.0002C17.4279 20.3701 20.3709 17.4269 24.001 17.4268C27.6312 17.4268 30.5736 20.37 30.5736 24.0002C30.5736 27.6304 27.6314 30.5723 24.0013 30.5723C20.3711 30.5723 17.4279 27.6304 17.4279 24.0002Z"
                                                       fill="currentColor"
                                                   />
                                                   <path
                                                       d="M24.0012 19.7334C26.3575 19.7334 28.2679 21.6436 28.2679 24.0001C28.2679 26.3564 26.3575 28.2668 24.0012 28.2668C21.6447 28.2668 19.7345 26.3564 19.7345 24.0001C19.7345 21.6436 21.6447 19.7334 24.0012 19.7334Z"
                                                       fill="currentColor"
                                                   />
                                               </svg>
                                           </div>
                                           <div>
                                               <svg
                                                   width="48"
                                                   height="48"
                                                   viewBox="0 0 48 48"
                                                   fill="none"
                                                   xmlns="http://www.w3.org/2000/svg"
                                               >
                                                   <path
                                                       fill-rule="evenodd"
                                                       clip-rule="evenodd"
                                                       d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM23.3316 20.338L23.2812 19.5075C23.1301 17.3551 24.4563 15.3891 26.5548 14.6265C27.327 14.3553 28.6364 14.3214 29.4926 14.5587C29.8283 14.6604 30.4663 14.9993 30.9195 15.3044L31.7421 15.8637L32.6486 15.5756C33.1523 15.423 33.8238 15.1688 34.1259 14.9993C34.4113 14.8468 34.6631 14.762 34.6631 14.8129C34.6631 15.101 34.042 16.084 33.5216 16.6263C32.8165 17.389 33.018 17.4568 34.4449 16.9483C35.3011 16.6602 35.3178 16.6602 35.15 16.9822C35.0492 17.1517 34.5288 17.7449 33.9748 18.2872C33.0347 19.2194 32.9844 19.3211 32.9844 20.1007C32.9844 21.304 32.4136 23.8123 31.8428 25.1851C30.7852 27.7612 28.5189 30.422 26.2526 31.7609C23.063 33.6422 18.8157 34.1167 15.24 33.0151C14.0481 32.6422 12 31.6931 12 31.5237C12 31.4728 12.6211 31.405 13.3766 31.3881C14.9546 31.3542 16.5326 30.9135 17.8756 30.1339L18.7822 29.5916L17.7413 29.2357C16.264 28.7272 14.9378 27.5578 14.6021 26.4562C14.5013 26.1003 14.5349 26.0833 15.475 26.0833L16.4487 26.0664L15.6261 25.6766C14.6524 25.1851 13.7627 24.3546 13.3262 23.5072C13.0072 22.8971 12.6044 21.3548 12.7219 21.2362C12.7554 21.1854 13.108 21.287 13.5109 21.4226C14.6692 21.8463 14.8203 21.7446 14.1488 21.0328C12.8897 19.7448 12.5036 17.8296 13.108 16.0162L13.3934 15.2027L14.5013 16.3043C16.7677 18.5245 19.4369 19.8465 22.4922 20.2363L23.3316 20.338Z"
                                                       fill="currentColor"
                                                   />
                                               </svg>
                                           </div>
                                           <div>
                                               <svg
                                                   width="48"
                                                   height="48"
                                                   viewBox="0 0 48 48"
                                                   fill="none"
                                                   xmlns="http://www.w3.org/2000/svg"
                                               >
                                                   <path
                                                       fill-rule="evenodd"
                                                       clip-rule="evenodd"
                                                       d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM34.0016 15.7493C35.1031 16.0516 35.9706 16.9422 36.265 18.0732C36.8 20.123 36.8 24.4 36.8 24.4C36.8 24.4 36.8 28.6768 36.265 30.7268C35.9706 31.8578 35.1031 32.7484 34.0016 33.0508C32.0054 33.6 24 33.6 24 33.6C24 33.6 15.9946 33.6 13.9983 33.0508C12.8967 32.7484 12.0292 31.8578 11.7348 30.7268C11.2 28.6768 11.2 24.4 11.2 24.4C11.2 24.4 11.2 20.123 11.7348 18.0732C12.0292 16.9422 12.8967 16.0516 13.9983 15.7493C15.9946 15.2 24 15.2 24 15.2C24 15.2 32.0054 15.2 34.0016 15.7493Z"
                                                       fill="currentColor"
                                                   />
                                                   <path
                                                       d="M21.6 28.8V20.8L28 24.8001L21.6 28.8Z"
                                                       fill="currentColor"
                                                   />
                                               </svg>
                                           </div>
                                       </div>
                                   </footer>
                               </td>
                           </tr>
                       </tbody>
                   </table>
               </body>
           </html>
           
               `// DONT REMOVE THIS!
           };
           transporter.sendMail(mailOptions, (err, info: SMTPTransport.SentMessageInfo) => {
               if (err) {
                   console.log(err);
                   return;
               }
               console.log('Message sent: %s', info.messageId);
               // Preview only available when sending through an Ethereal account
               console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
               return res.status(200).json({ status: 200, message: `Checkout in your email ${user.email}`});
               // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
               // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
               });
         }catch(e){
             console.log( e )
             return res.status(500).json({ status: 500, message: "Internal Server Error" })
         }
     }
}

export const authController = new AuthController();