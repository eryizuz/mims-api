import { Request, response, Response } from 'express';
import { Contact } from '../models/contact.model';
import { ContactProfile } from '../models/contact.profile.model';
class ContactController{
    public async index(req: any, res: Response ){
        try{
            let contacts = [];
            if ( req.user.role < 2 ){
                contacts = await Contact.findAll({
                    where:{  
                        deleted: 0
                    },
                    include: [
                        { model: ContactProfile },
                    ]
                });
            }else {
                contacts = await Contact.findAll({
                    where:{  
                        deleted: 0,
                        UserId: req.user.sub
                    },
                    include: [
                        { model: ContactProfile },
                    ]
                });
            }
            return res.status(201).json({ status: 201, data: contacts })
        }catch(e){
            console.log( e )
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }
    }
    public async show(req: any, res: Response ){
        try{
            let contact;
            if ( req.user.role < 2){
                contact = await Contact.findOne({
                    where: {
                        deleted: 0,
                        id: req.params.id
                    },
                    include: [
                        { model: ContactProfile },
                    ]
                })
            }else{
                contact = await Contact.findOne({
                    where: {
                        deleted: 0,
                        id: req.params.id,
                        UserId: req.user.sub
                    },
                    include: [
                        { model: ContactProfile },
                    ]
                })
            }
            if ( contact ){
                return res.status(201).json({ status: 201, data: contact });
            }else{
                return res.status(404).json({ status: 404, message: 'Not found'})
            }
        }catch(e){
            console.log( e )
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }
    }
    public async store(req: any, res: Response ){
        try{
            const { 
                type,
                is_client,
                is_company,
                referral_id,
                status,
                prefix,
                first_name,
                last_name,
                middle_name,
                company_id,
                title,
                date_of_birth,
                emails,
                phones,
                websites,
                addresses,
                custom_fields
            } = req.body;
            const contact = await Contact.create({
                type,
                is_client,
                is_company,
                referral_id,
                status,
                deleted: 0,
                UserId: req.user.sub
            })
            const profile = await ContactProfile.create({
                prefix,
                first_name,
                last_name,
                middle_name,
                company_id,
                title,
                date_of_birth,
                emails: JSON.stringify(emails),
                phones: JSON.stringify(phones),
                websites: JSON.stringify(websites),
                addresses: JSON.stringify(addresses),
                deleted: 0,
                ContactId: contact.id
            });
            contact.Profile = profile;
            return res.status(200).json({ status: 200, data: contact, message: 'Contact saved Successfully'});
        }catch(e){
            console.log( e )
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }
    }
    public async update(req: any, res: Response ){
        try{
            
            const { 
                type,
                is_client,
                is_company,
                referral_id,
                status,
                prefix,
                first_name,
                last_name,
                middle_name,
                company_id,
                title,
                date_of_birth,
                emails,
                phones,
                websites,
                addresses,
                custom_fields
            } = req.body;
            const contact = await Contact.findOne({
                where:{
                    id: req.params.id,
                    deleted: 0,
                }
            });
            const profile = await ContactProfile.findOne({
                where:{
                    contact_id: contact.id ,
                    deleted: 0,
                }
            });
            if ((req.user.role > 1 ) && (req.user.sub != contact.UserId)) return res.status(401).json({
                status: 401,
                message: 'Not authorized'
            })
            await contact?.update({
                type,
                is_client,
                is_company,
                referral_id,
                status
            })
            await profile?.update({
                prefix,
                first_name,
                last_name,
                middle_name,
                company_id,
                title,
                date_of_birth,
                emails: JSON.stringify(emails),
                phones: JSON.stringify(phones),
                websites: JSON.stringify(websites),
                addresses: JSON.stringify(addresses),
            });
            return res.status(201).json({ status: 201, message: 'Contact updated successfully'})
        }catch(e){
            console.log( e )
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }
    }
    public async destroy(req: any, res: Response ){
        try{
            const contact = await Contact.findOne({
                where:{
                    id: req.params.id,
                    deleted: 0,
                }
            });
            const profile = await ContactProfile.findOne({
                where:{
                    ContactId: contact.id ,
                    deleted: 0,
                }
            });
            if ((req.user.role > 1 ) && (req.user.sub != contact.UserId)) return res.status(401).json({
                status: 401,
                message: 'Not authorized'
            })
            await contact?.update({
                deleted: 1
            })
            await profile?.update({
                deleted: 1
            });
            return res.status(201).json({ status: 201, message: 'Contact deleted successfully'})
        }catch(e){
            console.log( e )
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }
    }
    public async clients(req:any, res: Response){
        try{
            let clients = [];
            if ( req.user.role < 2 ){
                clients = await Contact.findAll({
                    where:{  
                        deleted: 0,
                        is_client: 1
                    },
                    include: [
                        { model: ContactProfile },
                    ]
                });
            }else {
                clients = await Contact.findAll({
                    where:{  
                        deleted: 0,
                        UserId: req.user.sub,
                        is_client: 1
                    },
                    include: [
                        { model: ContactProfile },
                    ]
                });
            }
            return res.status(201).json({ status: 201, data: clients })
        }catch(e){
            console.log( e )
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            }) 
        }
    }
}

export const contactController = new ContactController();