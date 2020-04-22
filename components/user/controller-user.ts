const store = require('./store-user.ts');
const encriptacion = require('bcryptjs');

async function addUser(nombre: String, correo: String, clave: String) {
    encriptacion.hash(clave, 10)
        .then( async (nuevo: String) => {
            return await store.agregar(nombre, correo, nuevo);
        })
}

async function listUsers(){
    return await store.listar();
}

async function user_por_correo(correo: String){
    return await store.user_email(correo);
}

module.exports = {
    addUser,
    listUsers,
    user_por_correo
}