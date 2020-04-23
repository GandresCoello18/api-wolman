import { Request, Response } from 'express';

class Respuestas {
    
    constructor(){

    }

    success(req: Request, res: Response, mensaje: any, estado: any){
        res.status(estado || 200).send(mensaje);
    }

    error(req: Request, res: Response, mensaje: any, estado: any, detalles: String){
        console.log('[response error] ' +  detalles);

        res.status(estado || 500).send({ 
            error: mensaje,
            body: '',
        });
    }
}


let responder = new Respuestas();
export default responder;