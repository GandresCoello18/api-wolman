import { Request, Response, Router } from 'express';
import Store from './store-usuario';
const { comprobar } = require('../util/util-login');
import encriptacion from 'bcryptjs';
import Respuestas from '../../network/response';

class Usuario{
    router: Router;

    constructor(){
        this.router = Router();
        this.ruta();
    }

    crear_usuario(req: Request, res: Response){
        const { nombre, correo, clave, id_metodo } = req.body || null;
        
        console.log(req.hostname + ' host ip');

        let permisos = '';
        if(req.hostname == '127.0.0.1'){
            permisos = 'Estudiante';
        }else{
            permisos = 'Administrador';
        }


        Store.validar_usuario_existente(nombre, correo)
            .then( data => {
                if(data == 0){

                    encriptacion.hash(clave, 10)
                        .then(clave_encriptada => {
                            
                            Store.insertar_usuario(nombre, correo, clave_encriptada, id_metodo, permisos)
                                .then( data => {
                                    Respuestas.success(req, res, data, 200);
                                }).catch( err => {
                                    Respuestas.error(req, res, err, 500, 'Error al crear Usuario');
                                });

                        }).catch( err => {
                            console.log(new Error(err) + ' Error en cifrar clave');
                        });
            
                }else{
                    Respuestas.success(req, res, {'feeback': 'El usuario ya existe'}, 200);
                }
            }).catch( err => {
                console.log(new Error(err) + ' error en validar user existente');
            });

    }

    obtener_usuario(req: Request, res: Response){
        const { id } = req.params || null;

        Store.mis_datos_user(id)
            .then( info => {
                Respuestas.success(req, res, info, 200);
            }).catch( err => {
                Respuestas.error(req, res, err, 500, 'error en pedir datos unico user');
            });
    }

    obtener_usuarios(req: Request, res: Response){
        
        Store.consultar_usuarios()
            .then( data => {
                Respuestas.success(req, res, data, 201);
            }).catch( err => {
                Respuestas.error(req, res, err, 500, 'Error al consultar usuarios');
            });
    }

    editat_usuario(){

    }

    eliminar_usuario(){

    }

    mis_datos_generales(req: Request, res: Response){
    
        Store.mis_datos_user(res.locals.datos_user.id_user)
            .then( info => {
                Respuestas.success(req, res, info, 200);
            }).catch( err => {
                Respuestas.error(req, res, err, 500, 'error en pedir mis datos user');
            });
    }

    ruta(){
        this.router.get('/mis-datos', comprobar, this.mis_datos_generales)
        this.router.get('/', this.obtener_usuarios);
        this.router.get('/:id', this.obtener_usuario);
        this.router.post('/', this.crear_usuario);
    }
}

var user = new Usuario();

export default user.router;