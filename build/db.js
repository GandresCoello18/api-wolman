"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const { config } = require('./config/index.ts');
class Mysql {
    constructor() {
        this.conectar();
    }
    conectar() {
        var connection = mysql_1.default.createConnection({
            host: config.dbHost,
            user: config.dbUser,
            password: '',
            database: config.dbName,
        });
        connection.connect((err) => {
            if (err) {
                console.error(new Error(err));
            }
            else {
                console.log('conectado con exito');
            }
        });
        connection.on('err', (err) => {
            if (err)
                console.log(err);
        });
        return connection;
    }
}
let dataBase = new Mysql();
exports.default = dataBase.conectar();
