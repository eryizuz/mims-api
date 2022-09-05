import 'dotenv/config';
import jwt from 'jwt-simple';
import moment from 'moment';
import { Response } from 'express';
export const auth = async (req: any, res: Response, next:any ) => {
    if ( !req.headers.authorization) return res.status(200).send(
		{
			status: 200,
			message: 'La peticion no tiene la cabecera de autenticacion'
		});
        const Authorization: any = req.headers.authorization;
        const token: any = Authorization.split(' ')[1];
    try{
        const secret: string = <string> process.env?.JWT_KEY;
        const payload: any = await jwt.decode(token, secret);
		if ( payload.exp <= moment().unix()) return res.status(401).send({ 
			message: 'El token ha expirado'
		});
		req.user = payload;
		
		
    }catch(e){
        console.log(e)
        return res.status(401).json({ status: 401, message: 'El token no es válido'});
    }
    next();
} 