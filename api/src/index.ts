import express, { Application } from 'express';
import cors from 'cors';
import database from './config/database';
import authRoutes  from './routes/auth';
import userRoutes from './routes/user';
import contactRoutes from './routes/contact';
import customFieldRoutes from './routes/custom.field';
import setCustomFieldRoutes from './routes/set.custom.field';
import matterRoutes from './routes/matters';
class Server{
    public app: Application;
    public database = database;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    public async config(){
        this.app.set('port', process.env.PORT || 5000);
        
        this.app.use(cors({ origin: '*', credentials: true}));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false}));
        this.app.use(express.static('public'));
        this.app.set('trust proxy', true)
        
        try{
            await this.database.sync({
                alter: true
            });
        }catch(e){
            console.log(e)
        }finally{
            console.log("Database imported...")
        }
    }
    routes():void{
        this.app.use('/', authRoutes);
        this.app.use('/', userRoutes);
        this.app.use('/', contactRoutes );
        this.app.use('/', setCustomFieldRoutes)
        this.app.use('/', customFieldRoutes )
        this.app.use('/', matterRoutes )
    }
    start():void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port: ', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();