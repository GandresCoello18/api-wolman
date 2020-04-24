"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Respuestas {
    constructor() {
    }
    success(req, res, mensaje, estado) {
        res.status(estado || 200).send(mensaje);
    }
    error(req, res, mensaje, estado, detalles) {
        console.log('[response error] ' + detalles);
        res.status(estado || 500).send({
            error: mensaje,
            body: '',
        });
    }
}
let responder = new Respuestas();
exports.default = responder;
