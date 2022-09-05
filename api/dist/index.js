"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const contact_1 = __importDefault(require("./routes/contact"));
const custom_field_1 = __importDefault(require("./routes/custom.field"));
const set_custom_field_1 = __importDefault(require("./routes/set.custom.field"));
const matters_1 = __importDefault(require("./routes/matters"));
class Server {
    constructor() {
        this.database = database_1.default;
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        return __awaiter(this, void 0, void 0, function* () {
            this.app.set('port', process.env.PORT || 5000);
            this.app.use((0, cors_1.default)({ origin: '*', credentials: true }));
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: false }));
            this.app.use(express_1.default.static('public'));
            this.app.set('trust proxy', true);
            try {
                yield this.database.sync({
                    alter: true
                });
            }
            catch (e) {
                console.log(e);
            }
            finally {
                console.log("Database imported...");
            }
        });
    }
    routes() {
        this.app.use('/', auth_1.default);
        this.app.use('/', user_1.default);
        this.app.use('/', contact_1.default);
        this.app.use('/', set_custom_field_1.default);
        this.app.use('/', custom_field_1.default);
        this.app.use('/', matters_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
