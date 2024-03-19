import express from 'express';
import { login, registro, renew } from '../controllers/AuthController';
import { schemaValidation } from '../middlewares/schemaValidator.middleware';
import { loginSchema, registerSchema } from '../utils/schemas/auth.schema';
import { validatJwt } from '../middlewares/validarJwt';

const router = express.Router();

router.post('/login',schemaValidation(loginSchema),login);
router.post('/register',schemaValidation(registerSchema) ,registro);
router.get('/renew',validatJwt,renew);

export default router;