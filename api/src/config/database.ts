import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import { Contact } from '../models/contact.model';
import { ContactProfile } from '../models/contact.profile.model';
import { CustomField } from '../models/custom.field.model';
import { Matter } from '../models/matter.model';
import { Profile } from '../models/profile.model';
import { SetCustomField } from '../models/set.custom.field.model';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { VerificationCode } from '../models/verification.code.model';

const database = new Sequelize(
    <string> process.env?.DB_DATABASE,
    <string> process.env?.DB_USERNAME,
    process.env.DB_PASSWORD,{
        host: process.env?.DB_HOST,
        dialect: 'postgres',
        models: [
            User,
            Profile,
            Token,
            VerificationCode,
            Contact,
            ContactProfile,
            SetCustomField,
            CustomField,
            Matter
        ]
    }
);


export default database;