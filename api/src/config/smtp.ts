import 'dotenv/config';
import * as nodemailer from 'nodemailer';
const host : string = <string> process.env?.SMTP_HOST;
const port : string = <string> process.env?.SMTP_PORT;
const secure : boolean = false;
const user : string = <string> process.env?.SMTP_USER;
const pass : string = <string> process.env?.SMTP_PASSWORD
const transport : any = {
    host: host,
    port: port,
    // secure: true,
    auth: {
        user: user,
        pass: pass
    }
}
export const transporter = nodemailer.createTransport(transport);