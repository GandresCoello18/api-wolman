import database from '../../db';
import id from 'shortid';
import fechas from '../util/util-fecha';


class StoreUsuario{

    constructor(){

    }

    async insertar_usuario(nombre_usuario: String, correo: String, clave: String, id_metodo: Number){
        return await new Promise( (resolve, reject) => {
            database.query(`INSERT INTO usuarios_app (id_user, nombre_usuario, correo, clave, avatar, id_metodo_sesion, confir, fecha_registro) VALUES ('${id.generate()}', '${nombre_usuario}', '${correo}', '${clave}', '---', ${id_metodo}, 0, '${fechas.fecha_actual()}')`, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }

    async insertar_usuario_social(id_user: String, nombre: String, correo: String = 'null', avatar: String = 'null', metodo: Number){
        return await new Promise( (resolve, reject) => {
            database.query(`INSERT INTO usuarios_app (id_user, nombre_usuario, correo, clave, avatar, id_metodo_sesion, confir, fecha_registro) VALUES ('${id_user}', '${nombre}', '${correo}', 'null', '${avatar}', ${metodo}, 1, '${fechas.fecha_actual()}')`, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }

    async validar_usuario_existente(nombre_usuario: String, correo: String){
        return await new Promise( (resolve, reject) => {
            database.query(`SELECT * FROM usuarios_app WHERE nombre_usuario = '${nombre_usuario}' AND correo = '${correo}' `, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }

    async consultar_usuarios(){
        return await new Promise( (resolve, reject) => {
            database.query(`SELECT * FROM usuarios_app`, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }



}

let store = new StoreUsuario();

export default store;