import { Router } from 'express';
import { setCustomFieldController } from '../controllers/set.custom.field.controller';
import { auth } from '../middlewares/auth';

class SetCustomFieldRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    public async config(){
        this.router.get('/sets', auth, setCustomFieldController.index)
        this.router.post('/sets', auth, setCustomFieldController.store)
        this.router.get('/sets/:id', auth, setCustomFieldController.show)
        this.router.put('/sets/:id', auth, setCustomFieldController.update)
        this.router.delete('/sets/:id', auth, setCustomFieldController.destroy)
    }
}

const setCustomFieldRoutes = new SetCustomFieldRoutes();
export default setCustomFieldRoutes.router;