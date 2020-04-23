import express, { Request, Response, Router } from 'express';


class IndexRutas{
    public router: Router;
    public app: express.Application;

    constructor(){
        this.router = Router();
        this.rutas();
        this.app = express();
    }

    rutas(){
        this.router.get('/', (req, res) => res.send('/Api: principal'));
    }
}

const index = new IndexRutas();
index.rutas();

export default index.router;