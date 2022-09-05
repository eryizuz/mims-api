import { Request, Response } from 'express';
import { getToken } from '../services/jwt';

const createToken = async (user:any, res: Response) =>{
    try{
        const User = user;
        const token = getToken(User);
        return token;
    }catch(e){
        return res.status(500).send({ status: 500, message: 'Internal Server Error'})
    }
}
export { createToken };