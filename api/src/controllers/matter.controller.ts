import { Response } from 'express';
import { Matter } from '../models/matter.model';
import * as uid from "uuid";
class MatterController {
    async index(req: any, res: Response){
        try{
            let matters = [];
            if ( req.user.role < 2){
                matters = await Matter.findAll({
                    where:{
                        deleted: 0
                    }
                })
            }else{
                matters = await Matter.findAll({
                    where:{
                        deleted: 0,
                        UserId: req.user.sub
                    }
                })
            }
            return res.status(201).json({ status: 201, data: matters })
        }catch(e){
            console.log ( e )
            return res.status(500).json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async show(req: any, res: Response){
        try{
            let matter;
            if ( req.user.role < 2 ){
                matter = await Matter.findOne({
                    where:{
                        deleted: 0,
                        id: req.params.id
                    }
                })
            }else{
                matter = await Matter.findOne({
                    where:{
                        deleted: 0,
                        id: req.params.id,
                        UserId: req.user.sub
                    }
                })
            }
        if ( matter ){
            return res.status(201).json({ status: 201, data: matter })
        }else{
            return res.status(404).json({ status: 404, message: 'Not found'})
        }

        }catch(e){
            console.log ( e )
            return res.status(500).json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async store(req: any, res: Response){
        try{
            const {
                type,
                status,
                permissions,
                practice_area,
                description,
                responsible_attorney,
                originating_attorney,
                open_date,
                closed_date,
                pending_date,
                limitations_date,
                relationship,
                custom_fields,
                set_custom_fields,
                billing_preferences,
                task_automation,
                client_reference_number,
                location,
                ClientId
            } = req.body;
            let uuid = await uid.v4();
            const matter = await Matter.create({
                type,
                status,
                permissions: JSON.stringify(permissions),
                practice_area: JSON.stringify(practice_area),
                description,
                responsible_attorney: JSON.stringify(responsible_attorney),
                originating_attorney: JSON.stringify(originating_attorney),
                open_date,
                closed_date,
                pending_date,
                limitations_date,
                relationship: JSON.stringify(relationship),
                custom_fields: JSON.stringify(custom_fields),
                set_custom_fields: JSON.stringify(set_custom_fields),
                billing_preferences: JSON.stringify(billing_preferences),
                task_automation: JSON.stringify(task_automation),
                UserId: req.user.sub,
                deleted: 0,
                ClientId,
                uuid,
                client_reference_number,
                location
            })
            return res.status(201).json({
                 status: 201,
                 data: matter
            })
        }catch(e){
            console.log ( e )
            return res.status(500).json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async update(req: any, res: Response){
        try{
            const {
                type,
                status,
                permissions,
                practice_area,
                description,
                responsible_attorney,
                originating_attorney,
                open_date,
                closed_date,
                pending_date,
                limitations_date,
                relationship,
                custom_fields,
                set_custom_fields,
                billing_preferences,
                task_automation,
                ClientId,
                client_reference_number,
                location
            } = req.body;
            let uuid = await uid.v4();
            const matter = await Matter.findOne({
                where:{
                    id: req.params.id,
                    deleted: 0,
                    UserId: req.user.sub
                }
            })
            await matter.update({
                type,
                status,
                permissions: JSON.stringify(permissions),
                practice_area: JSON.stringify(practice_area),
                description,
                responsible_attorney: JSON.stringify(responsible_attorney),
                originating_attorney: JSON.stringify(originating_attorney),
                open_date,
                closed_date,
                pending_date,
                limitations_date,
                relationship: JSON.stringify(relationship),
                custom_fields: JSON.stringify(custom_fields),
                set_custom_fields: JSON.stringify(set_custom_fields),
                billing_preferences: JSON.stringify(billing_preferences),
                task_automation: JSON.stringify(task_automation),
                UserId: req.user.sub,
                deleted: 0,
                ClientId,
                uuid,
                location,
                client_reference_number
            })

            return res.status(201).json({
                status: 201,
                message: 'Matter updated successfully'
            })
        }catch(e){
            console.log ( e )
            return res.status(500).json({ status: 500, message: 'Internal Server Error'})
        }
    }
    async destroy(req: any, res: Response){
        try{
            const matter = await Matter.findOne({
                where:{
                    id: req.params.id,
                    deleted: 0,
                    UserId: req.user.sub
                }
            })

            if ( matter ){
                await matter.update({deleted: 1});
                return res.status(201).json({ status: 201, message: 'Matter deleted successfully'})
            }else{
                return res.status(404).json({
                    status: 404,
                    message: 'Not found'
                })    
            }
            
        }catch(e){
            console.log ( e )
            return res.status(500).json({ status: 500, message: 'Internal Server Error'})
        }
    }
}


export const matterController = new MatterController();