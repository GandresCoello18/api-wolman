import { Request, Response, Router } from 'express';
import Store from './store-usuario';
import Respuestas from '../../network/response';

class Usuario{
    router: Router;

    constructor(){
        this.router = Router();
        this.ruta();
    }

    crear_usuario(req: Request, res: Response){
        const { nombre, apellido, edad } = req.body || null;

        Store.insertar_usuario(nombre,apellido,edad)
            .then( data => {
                Respuestas.success(req, res, data, 200);
            }).catch( err => {
                Respuestas.error(req, res, err, 500, 'Error al crear Usuario');
            });
    }

    obtener_usuario(req: Request, res: Response){
        res.send(`Este es el id: ${req.params.id}`);
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

    ruta(){
        this.router.get('/', this.obtener_usuarios);
        this.router.get('/:id', this.obtener_usuario);
        this.router.post('/', this.crear_usuario);
    }
}

var user = new Usuario();

export default user.router;