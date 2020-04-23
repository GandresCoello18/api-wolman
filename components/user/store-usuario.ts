import database from '../../db';


class StoreUsuario{

    constructor(){

    }

    async insertar_usuario(nombre: String, apellido: String, edad: Number){
        return await new Promise( (resolve, reject) => {
            database.query(`INSERT INTO usuarios (nombre, apellido, edad) VALUES ('${nombre}', '${apellido}', ${edad})`, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }

    async consultar_usuarios(){
        return await new Promise( (resolve, reject) => {
            database.query(`SELECT * FROM usuarios`, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }



}

let store = new StoreUsuario();

export default store;