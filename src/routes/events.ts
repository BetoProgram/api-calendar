import express from 'express';
import { validatJwt } from '../middlewares/validarJwt';
import { actualizaEvento, crearEvento, eliminaEvento, getEventos } from '../controllers/EventsControllers';
import { schemaValidation } from '../middlewares/schemaValidator.middleware';
import { eventoCrearSchema } from '../utils/schemas/event.schema';

const router = express.Router();

router.get('/',validatJwt,getEventos);
router.post('/',[validatJwt, schemaValidation(eventoCrearSchema)],crearEvento);
router.put('/:id',validatJwt,actualizaEvento);
router.delete('/:id',validatJwt,eliminaEvento);

export default router;

