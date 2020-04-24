"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
class IndexRutas {
    constructor() {
        this.router = express_1.Router();
        this.rutas();
        this.app = express_1.default();
    }
    rutas() {
        this.router.get('/', (req, res) => res.send('/Api: principal'));
    }
}
const index = new IndexRutas();
index.rutas();
exports.default = index.router;
