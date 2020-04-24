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
const express_1 = require("express");
const response_1 = __importDefault(require("../../network/response"));
const store_login_1 = __importDefault(require("./store-login"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { config } = require('../../config/index');
class Login {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    autenticar(req, res) {
        const { correo, clave } = req.body || null;
        store_login_1.default.validar_credenciales(correo)
            .then((data) => __awaiter(this, void 0, void 0, function* () {
            if (data == 0) {
                response_1.default.success(req, res, { 'feeback': 'Los Datos que ingreso son incorrectos' }, 200);
            }
            else {
                if (yield bcryptjs_1.default.compare(clave, data[0].clave)) {
                    const payload = { id: data[0].id_user, correo, clave: data[0].clave };
                    const token = jsonwebtoken_1.default.sign(payload, config.jwtSecret);
                    response_1.default.success(req, res, { 'token': token }, 200);
                }
                else {
                    response_1.default.success(req, res, { 'feeback': 'Los Datos que ingreso son incorrectos' }, 200);
                }
            }
        })).catch(err => {
            console.log(new Error(err) + ' Error en validar el usuario de la db');
        });
    }
    ruta() {
        this.router.post('/autenticacion', this.autenticar);
    }
}
let login = new Login();
exports.default = login.router;
