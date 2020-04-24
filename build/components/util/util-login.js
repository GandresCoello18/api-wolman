"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = __importDefault(require("../../network/response"));
const { config } = require('../../config/index');
const comprobar = express_1.Router();
comprobar.use((req, res, next) => {
    const token = req.headers['access-token'];
    console.log(token);
    if (token) {
        jsonwebtoken_1.default.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                response_1.default.success(req, res, { "feeback": 'Token inválida o expirada' }, 200);
            }
            else {
                console.log(decoded);
                res.locals.datos_user = decoded;
                next();
            }
        });
    }
    else {
        response_1.default.success(req, res, { "feeback": 'Token no proveída o no ingresada' }, 200);
    }
});
module.exports = {
    comprobar
};
