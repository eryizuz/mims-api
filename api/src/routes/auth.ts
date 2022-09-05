import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { auth } from '../middlewares/auth';

class AuthRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    public async config(){
        this.router.post('/auth/login', authController.login)
        this.router.post('/auth/register', authController.register)
        this.router.post('/auth/verify', authController.verify);
        this.router.get('/auth/verification', auth, authController.verification )
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;