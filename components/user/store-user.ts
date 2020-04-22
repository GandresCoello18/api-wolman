const db = require('../../db');

function agregar(nombre: String, correo: String, clave: String) {
    return new Promise( (resolve, reject) => {
        db.query(`INSERT INTO usuario (nombre, clave, correo) VALUES ('${nombre}', '${clave}', '${correo}')`, (err: String, data: Object) => {
            if(err) return reject(err);
            resolve(data);
        });
    })
}

function listar(): Promise<any> {
    return new Promise( (resolve, reject) => {
        db.query(`SELECT * FROM usuario`, (err: String, data: Object) => {
            if(err) return reject(err);
            resolve(data);
        });
    })
}

function user_email(correo: String){
    return new Promise( (resolve, reject) => {
        db.query(`SELECT * FROM usuario WHERE correo = '${correo}'`, (err: String, data: Object) => {
            if(err) return reject(err);
            resolve(data);
        });
    })
}

module.exports = {
    agregar,
    listUsers,
    user_email
}