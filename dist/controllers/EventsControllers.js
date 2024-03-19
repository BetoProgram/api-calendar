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
exports.eliminaEvento = exports.actualizaEvento = exports.crearEvento = exports.getEventos = void 0;
const Evento_1 = __importDefault(require("../models/Evento"));
const getEventos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventos = yield Evento_1.default.find().populate('user', 'name');
    res.json({
        eventos
    });
});
exports.getEventos = getEventos;
const crearEvento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const evento = new Evento_1.default(req.body);
        //@ts-ignorets-ignore
        evento.user = req.uid;
        yield evento.save();
        res.status(201).json({
            evento
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Ha ocurrido n error al crear un evento'
        });
    }
});
exports.crearEvento = crearEvento;
const actualizaEvento = (_a, res_1) => __awaiter(void 0, [_a, res_1], void 0, function* ({ params, body, uid }, res) {
    const eventoId = params.id;
    try {
        const evento = yield Evento_1.default.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                message: 'Evento no existe por ese id'
            });
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                message: 'No tienes privilegios para editar el evento'
            });
        }
        const nuevoEvento = Object.assign(Object.assign({}, body), { user: uid });
        const eventoUp = yield Evento_1.default.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });
        res.status(201).json({
            evento: eventoUp
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Ha ocurrido n error al crear un evento'
        });
    }
});
exports.actualizaEvento = actualizaEvento;
const eliminaEvento = (_b, res_2) => __awaiter(void 0, [_b, res_2], void 0, function* ({ params, uid }, res) {
    const eventoId = params.id;
    try {
        const evento = yield Evento_1.default.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                message: 'Evento no existe por ese id'
            });
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                message: 'No tienes privilegios para eliminar el evento'
            });
        }
        yield Evento_1.default.findByIdAndDelete(eventoId);
        res.status(201).json();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Ha ocurrido n error al crear un evento'
        });
    }
});
exports.eliminaEvento = eliminaEvento;
