import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { auth } from '../middlewares/auth';
class UserRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    public async config(){
        this.router.get('/users', auth, userController.index)
        this.router.post('/users', auth, userController.store)
        this.router.get('/users/:id', auth, userController.show)
        this.router.put('/users/:id', auth, userController.update)
        this.router.delete('/users/:id', auth, userController.destroy)
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;