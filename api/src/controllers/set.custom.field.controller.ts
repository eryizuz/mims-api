import { Request, Response } from 'express';
import { CustomField } from '../models/custom.field.model';
import { SetCustomField } from '../models/set.custom.field.model';


class SetCustomFieldController {
    async index(req: any, res: Response ){
        try{
            let sets = await SetCustomField.findAll({
                where:{
                    UserId: req.user.sub,
                    deleted: 0
                },
                include: [
                    { model: CustomField }
                ]
            })
            return res.status(201).json({ status: 201, data: sets })
        }catch( e ){
            console.log( e );
            return res.status(500).json({ status: 500, message: 'Internal Server Error.'})
        }
    }
    async store(req: any, res: Response ){
        try{
           const { name, status, type } = req.body;
           const set= await SetCustomField.create({
               name,
               status,
               type,
               deleted: 0,
               UserId: req.user.sub
           }) 
           return res.status(201).json({ status: 201, message: 'Set Custom Field Saved Successfully'})
        }catch( e ){
            console.log( e );
            return res.status(500).json({ status: 500, message: 'Internal Server Error.'})
        }
    }
    async show(req: any, res: Response ){
        try{
            const set = await SetCustomField.findOne({
                where:{
                    id: req.params.id,
                    deleted: 0
                },
                include: [
                    { model: CustomField }
                ]
            })
            return res.status(201).json({ status: 201, data: set })
        }catch( e ){
            console.log( e );
            return res.status(500).json({ status: 500, message: 'Internal Server Error.'})
        }
    }
    async update(req: any, res: Response ){
        try{
            const { name, status, type } = req.body;
            const set = await SetCustomField.findOne({
                where:{
                    id: req.params.id,
                    deleted: 0
                },
                include: [
                    { model: CustomField }
                ]
            })
            if ( await set.update({
                type,
                name,
                status
            })){
                return res.status(201).json({ status: 201, message: 'Set Custom Field updated successfully'})
            }else{
                return res.status(401).json({ status: 401, message: 'Not authorized'})
            }
            return res.status(201).json({ status: 201, message: 'Set Custom Field Updated Successfully' })
        }catch( e ){
            console.log( e );
            return res.status(500).json({ status: 500, message: 'Internal Server Error.'})
        }
    }
    async destroy(req: any, res: Response ){
        try{
            const set = await SetCustomField.findOne({
                where:{
                    id: req.params.id,
                    deleted: 0
                },
                include: [
                    { model: CustomField }
                ]
            })
            if ( await set.update({
                deleted: 1
            })){
                return res.status(201).json({ status: 201, message: 'Set Custom Field deleted successfully'})
            }else{
                return res.status(401).json({ status: 401, message: 'Not authorized'})
            }

        }catch( e ){
            console.log( e );
            return res.status(500).json({ status: 500, message: 'Internal Server Error.'})
        }
    }
}


export const setCustomFieldController = new SetCustomFieldController();