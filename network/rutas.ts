import { Request, Response, Router } from 'express';

class IndexRutas{
    public router: Router;

    constructor(){
        this.router = Router();
        this.rutas();
    }

    rutas(){
        this.router.get('/', (req, res) => res.send('yess'));
    }
}

const index = new IndexRutas();
index.rutas();

export default index.router;