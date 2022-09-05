import { Router } from 'express';
import { matterController } from '../controllers/matter.controller';
import { auth } from '../middlewares/auth';

class MatterRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    public async config(){
        this.router.get('/matters', auth, matterController.index)
        this.router.post('/matters', auth, matterController.store)
        this.router.get('/matters/:id', auth, matterController.show)
        this.router.put('/matters/:id', auth, matterController.update)
        this.router.delete('/matters/:id', auth, matterController.destroy)
    }
}

const matterRoutes = new MatterRoutes();
export default matterRoutes.router;