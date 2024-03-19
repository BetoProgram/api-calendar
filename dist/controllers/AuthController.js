"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renew = exports.registro = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const Usuario_1 = __importDefault(require("../models/Usuario"));
const jwt_1 = require("../utils/jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let usuario = yield Usuario_1.default.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                message: `El usuario no existe con ese email`
            });
        }
        const validPassword = bcrypt_1.default.compareSync(password, usuario.password);
        if (validPassword === false) {
            return res.status(400).json({
                message: 'Contraseña no es vilida'
            });
        }
        const token = yield (0, jwt_1.generarJWT)(usuario._id, usuario.name);
        res.status(200).json({
            uid: usuario._id,
            name: usuario.name,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al crear el usuario' });
    }
});
exports.login = login;
const registro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        let usuario = yield Usuario_1.default.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                message: `El usuario ${email} ya esta registrado`
            });
        }
        usuario = new Usuario_1.default(req.body);
        const salt = bcrypt_1.default.genSaltSync();
        usuario.password = bcrypt_1.default.hashSync(password, salt);
        yield usuario.save();
        const token = yield (0, jwt_1.generarJWT)(usuario._id, usuario.name);
        res.status(201).json({
            message: 'Usuario creado',
            uid: usuario._id,
            name: usuario.name,
            token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al crear el usuario' });
    }
});
exports.registro = registro;
const renew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.uid;
    const name = req.name;
    const token = yield (0, jwt_1.generarJWT)(uid, name);
    res.json({ uid, name, token });
});
exports.renew = renew;
