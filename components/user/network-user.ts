const express = require('express');
const response = require('../../network/response.ts');
const controller = require('./controller-user.ts');
//const { rutasProtegidas } = require('../login/controller-login');
const router = express.Router();


router.post('/', function(req: any, res: any) {
    const { nombre, correo, clave } = req.body || null;

    controller.addUser(nombre, correo, clave)
        .then( (data: Object) => {
            response.success(req, res, data, 201);
        })
        .catch( (err: Object) => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.get('/', function(req: any, res: any) {
    controller.listUsers()
        .then( (users: any) => {
            response.success(req, res, users, 200);
        })
        .catch( (err: String) => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.get('/:correo', function(req: any, res: any) {
    const { correo } = req.params || null;
    
    controller.user_por_correo(correo)
        .then( (users: Object) => {
            response.success(req, res, users, 200);
        })
        .catch( (err: Object) => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

module.exports = router;