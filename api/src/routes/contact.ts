import { Router } from 'express';
import { contactController } from '../controllers/contact.controller';
import { auth } from '../middlewares/auth';

class ContactRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    public async config(){
        this.router.get('/contacts', auth, contactController.index)
        this.router.get('/clients', auth, contactController.clients)
        this.router.post('/contacts', auth, contactController.store)
        this.router.get('/contacts/:id', auth, contactController.show)
        this.router.put('/contacts/:id', auth, contactController.update)
        this.router.delete('/contacts/:id', auth, contactController.destroy)
    }
}

const contactRoutes = new ContactRoutes();
export default contactRoutes.router;