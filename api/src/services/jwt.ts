import 'dotenv/config';
import jwt from 'jwt-simple';
import moment from 'moment';

const getToken = ( user:any ) =>{
    try{
        const payload = {
            sub: user.id,
            uuid: user.uuid,
            email: user.email,
            username: user.username,
            role: user.role,
            verified: user.verified,
            type: user.type,
            deleted: user.deleted,
            iat: moment().unix(),
            exp: moment().add(30, 'days').unix()
        }
        const secret: string = <string> process.env?.JWT_KEY;
        return jwt.encode(payload, secret);
    }catch(e){
        console.log(e)
    }
} 
export { getToken };