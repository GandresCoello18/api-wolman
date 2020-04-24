"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const store_usuario_1 = __importDefault(require("./store-usuario"));
const { comprobar } = require('../util/util-login');
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const response_1 = __importDefault(require("../../network/response"));
class Usuario {
    constructor() {
        this.router = express_1.Router();
        this.ruta();
    }
    crear_usuario(req, res) {
        const { nombre_usuario, correo, clave, id_metodo } = req.body || null;
        console.log(req.body);
        store_usuario_1.default.validar_usuario_existente(nombre_usuario, correo)
            .then(data => {
            if (data == 0) {
                bcryptjs_1.default.hash(clave, 10)
                    .then(clave_encriptada => {
                    store_usuario_1.default.insertar_usuario(nombre_usuario, correo, clave_encriptada, id_metodo)
                        .then(data => {
                        response_1.default.success(req, res, data, 200);
                    }).catch(err => {
                        response_1.default.error(req, res, err, 500, 'Error al crear Usuario');
                    });
                }).catch(err => {
                    console.log(new Error(err) + ' Error en cifrar clave');
                });
            }
            else {
                response_1.default.success(req, res, { 'feeback': 'El usuario ya existe' }, 200);
            }
        }).catch(err => {
            console.log(new Error(err) + ' error en validar user existente');
        });
    }
    obtener_usuario(req, res) {
        res.send(`Este es el id: ${req.params.id} y los datos son: ${res.locals.datos_user.clave}`);
    }
    obtener_usuarios(req, res) {
        store_usuario_1.default.consultar_usuarios()
            .then(data => {
            response_1.default.success(req, res, data, 201);
        }).catch(err => {
            response_1.default.error(req, res, err, 500, 'Error al consultar usuarios');
        });
    }
    editat_usuario() {
    }
    eliminar_usuario() {
    }
    ruta() {
        this.router.get('/', this.obtener_usuarios);
        this.router.get('/:id', comprobar, this.obtener_usuario);
        this.router.post('/', this.crear_usuario);
    }
}
var user = new Usuario();
exports.default = user.router;
