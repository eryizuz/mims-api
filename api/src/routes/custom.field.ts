import { Router } from 'express';
import { customFieldController } from '../controllers/custom.field.controller';

import { auth } from '../middlewares/auth';

class CustomFieldsRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    public async config(){
        this.router.get('/custom_fields', auth, customFieldController.index)
        this.router.post('/custom_fields', auth, customFieldController.store)
        this.router.get('/custom_fields/:id', auth, customFieldController.show)
        this.router.put('/custom_fields/:id', auth, customFieldController.update)
        this.router.delete('/custom_fields/:id', auth, customFieldController.destroy)
    }
}

const customFieldRoutes = new CustomFieldsRoutes();
export default customFieldRoutes.router;