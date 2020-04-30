import { Request, Response, Router } from 'express';
import Respuesta from '../../network/response';
import Store from './store-login';
import StoreUser from '../user/store-usuario';
import encripctacion from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { comprobar } = require('../util/util-login');
const { config } = require('../../config/index');


class Login {
    router: Router;

    constructor(){
        this.router = Router();
        this.ruta();
    }

    validar_vida_token(req: Request, res: Response){
        console.log('validando el tiempo de vida del token, token activo');
        Respuesta.success(req, res, {'feeback': 'Token activo'}, 200);
    }    

    autenticar(req: Request, res: Response){
        const { correo,  clave}  = req.body || null;

        Store.validar_credenciales(correo)
            .then( async (data: any) => {
                
                if(data == 0){
                    Respuesta.success(req, res, {'feeback': 'Los Datos que ingreso son incorrectos'}, 200);
                }else{
                    if(await encripctacion.compare(clave, data[0].clave)){

                        let datos = { id_user: data[0].id_user, correo, clave: data[0].clave };
                        const token = jwt.sign(datos, config.jwtSecret);

                        Respuesta.success(req, res, {'token': token}, 200);

                    }else{
                        Respuesta.success(req, res, {'feeback': 'Los Datos que ingreso son incorrectos'}, 200);
                    }
                        
                }

            }).catch( err => {
                console.log(new Error(err) + ' Error en validar el usuario de la db');
            });
    }

    autenticar_sociales(req: Request, res: Response){
        const { id, user_name, email, avatar, metodo } = req.body || null;

        Store.validar_credenciales_sociales(id, metodo)
            .then( (data: any) => {

                let permisos = '';
                if(req.hostname == '127.0.0.1'){
                    permisos = 'Estudiante';
                }else{
                    permisos = 'Administrador';
                }

                let template = {
                    id_user: id,
                    nombre_usuario: user_name,
                    correo: email,
                    avatar,
                    id_metodo_sesion: metodo,
                    permisos
                }

                console.log(template);
                const token = jwt.sign(template, config.jwtSecret);

                if(data == 0){
                    StoreUser.insertar_usuario_social(template.id_user, template.nombre_usuario, template.correo, template.avatar, template.id_metodo_sesion, template.permisos);
                    Respuesta.success(req, res, {'token': token}, 201);
                }else{
                    Respuesta.success(req, res, {'token': token}, 201);
                }

            }).catch( err => {
                console.log(new Error(err) + ' Error en autenticar sociales');
            });
    }

    ruta(){
        this.router.get('/autenticacion', comprobar, this.validar_vida_token);
        this.router.post('/autenticacion', this.autenticar);
        this.router.post('/autenticacion/social', this.autenticar_sociales);
    }

}

let login = new Login();
export default login.router;