import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import Respuesta from '../../network/response';
import { decode } from 'punycode';
const { config } = require('../../config/index');

const comprobar = Router();

comprobar.use( (req: Request, res: Response, next: NextFunction) => {
    const token: String | any = req.headers['access-token'];
        console.log(token);
        
        if (token) {
            jwt.verify(token, config.jwtSecret, (err: any, decoded: any) => {      
                if (err) {    
                    Respuesta.success(req, res, {"feeback": 'Token inválida o expirada'}, 200);
                } else {
                    console.log(decoded);
                    res.locals.datos_user = decoded;
                    next();
                }
            });
        }else{
            Respuesta.success(req, res, {"feeback": 'Token no proveída o no ingresada'}, 200);
        }
});

module.exports = {
    comprobar
}