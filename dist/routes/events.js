"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validarJwt_1 = require("../middlewares/validarJwt");
const EventsControllers_1 = require("../controllers/EventsControllers");
const schemaValidator_middleware_1 = require("../middlewares/schemaValidator.middleware");
const event_schema_1 = require("../utils/schemas/event.schema");
const router = express_1.default.Router();
router.get('/', validarJwt_1.validatJwt, EventsControllers_1.getEventos);
router.post('/', [validarJwt_1.validatJwt, (0, schemaValidator_middleware_1.schemaValidation)(event_schema_1.eventoCrearSchema)], EventsControllers_1.crearEvento);
router.put('/:id', validarJwt_1.validatJwt, EventsControllers_1.actualizaEvento);
router.delete('/:id', validarJwt_1.validatJwt, EventsControllers_1.eliminaEvento);
exports.default = router;
