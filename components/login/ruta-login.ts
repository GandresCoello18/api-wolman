import { Request, Response, Router } from 'express';
import Respuesta from '../../network/response';
import Store from './store-login';
import encripctacion from 'bcryptjs';
import jwt from 'jsonwebtoken';
const { config } = require('../../config/index');


class Login {
    router: Router;

    constructor(){
        this.router = Router();
        this.ruta();
    }

    autenticar(req: Request, res: Response){
        const { correo,  clave}  = req.body || null;

        Store.validar_credenciales(correo)
            .then( async (data: any) => {
                
                if(data == 0){
                    Respuesta.success(req, res, {'feeback': 'Los Datos que ingreso son incorrectos'}, 200);
                }else{
                    if(await encripctacion.compare(clave, data[0].clave)){

                        const payload = { id: data[0].id_user, correo, clave: data[0].clave };

                        const token = jwt.sign(payload, config.jwtSecret);

                        Respuesta.success(req, res, {'token': token}, 200);

                    }else{
                        Respuesta.success(req, res, {'feeback': 'Los Datos que ingreso son incorrectos'}, 200);
                    }
                        
                }

            }).catch( err => {
                console.log(new Error(err) + ' Error en validar el usuario de la db');
            });
    }

    ruta(){
        this.router.post('/autenticacion', this.autenticar);
    }

}

let login = new Login();
export default login.router;