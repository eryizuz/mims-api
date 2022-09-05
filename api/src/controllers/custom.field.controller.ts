import { Request, response, Response } from 'express';
import { CustomField } from '../models/custom.field.model';

class CustomFieldController{
    async index( req: any, res: Response ){
        try{
            const fields = await CustomField.findAll({
                where:{
                    deleted: 0,
                    UserId: req.user.sub
                }
            })
            return res.status(201).json({status: 201, data: fields })
        }catch(e){
            console.log( e )
            return res.status(500).json({ status: 500, message: 'Algo salio mal.'})
        }
    }
    async store( req: any, res: Response ){
        try{
            const { name, status, type, content, SetCustomFieldId } = req.body;
            const field = await CustomField.create({
                name,
                status,
                type,
                content: JSON.stringify(content),
                UserId: req.user.sub,
                SetCustomFieldId,
                deleted: 0,
            }) 
            return res.status(201).json({ status: 201, data: field, message: 'Custom Field Saved Successfully'})
        }catch(e){
            console.log( e )
            return res.status(500).json({ status: 500, message: 'Algo salio mal.'})
        }
    }
    async show( req: any, res: Response ){
        try{
            const field = await CustomField.findOne({
                where:{
                    id: req.params.id,
                    UserId: req.user.sub,
                    deleted: 0
                }
            })
            return res.status(201).json({ status: 201, data: field })
        }catch(e){
            console.log( e )
            return res.status(500).json({ status: 500, message: 'Algo salio mal.'})
        }
    }
    async update( req: any, res: Response ){
        try{
            const { name, status, type, content, SetCustomFieldId } = req.body;
            const field = await CustomField.findOne({
                where:{
                    id: req.params.id,
                    UserId: req.user.sub,
                    deleted: 0
                }
            })
            await field?.update({
                name, 
                status,
                type,
                content: JSON.stringify(content),
                SetCustomFieldId,
                UserId: req.user.sub
            })
            return res.status(201).json({ status: 201, data: field, message: 'Custom updated successfully' })
        }catch(e){

            console.log( e )
            return res.status(500).json({ status: 500, message: 'Algo salio mal.'})
        }
    }
    async destroy( req: any, res: Response ){
        try{
            const field = await CustomField.findOne({
                where:{
                    id: req.params.id,
                    UserId: req.user.sub,
                    deleted: 0
                }
            })
            await field?.update({
                deleted: 1
            })
            return res.status(201).json({ status: 201, data: field, message: 'Custom Field deleted successfully' })
        }catch(e){
            console.log( e )
            return res.status(500).json({ status: 500, message: 'Algo salio mal.'})
        }
    }
}
export const customFieldController = new CustomFieldController();