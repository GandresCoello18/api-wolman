"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const rutas_1 = __importDefault(require("./network/rutas"));
const ruta_usuario_1 = __importDefault(require("./components/user/ruta-usuario"));
const ruta_login_1 = __importDefault(require("./components/login/ruta-login"));
const { config } = require('./config/index');
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', config.port || 3000);
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json());
        this.app.use('/static', express_1.default.static('public'));
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api', rutas_1.default);
        this.app.use('/api/usuario', ruta_usuario_1.default);
        this.app.use('/api/login', ruta_login_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => console.log('Server levantado'));
    }
}
const server = new Server();
server.start();
