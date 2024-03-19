"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validatJwt = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json(401).json({
            message: 'No se a enviado token en la peticion'
        });
    }
    try {
        const { uid, name } = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.name = name;
    }
    catch (error) {
        return res.json(401).json({
            message: 'Token no valido'
        });
    }
    next();
};
exports.validatJwt = validatJwt;
