import database from '../../db';

class Store {


    async validar_credenciales(correo: String){
        return await new Promise( (resolve, reject) => {
            database.query(`SELECT * FROM usuarios_app WHERE correo = '${correo}' `, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }


    async validar_credenciales_sociales(id: String, metodo: Number){
        return await new Promise( (resolve, reject) => {
            database.query(`SELECT * FROM usuarios_app WHERE id_user = '${id}' AND id_metodo_sesion = '${metodo}'; `, (err, data) => {
                if(err) return reject(err);
                resolve(data);
            });
        });
    }


}

let store = new Store();
export default store;