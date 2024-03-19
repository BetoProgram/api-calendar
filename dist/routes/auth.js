"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const schemaValidator_middleware_1 = require("../middlewares/schemaValidator.middleware");
const auth_schema_1 = require("../utils/schemas/auth.schema");
const validarJwt_1 = require("../middlewares/validarJwt");
const router = express_1.default.Router();
router.post('/login', (0, schemaValidator_middleware_1.schemaValidation)(auth_schema_1.loginSchema), AuthController_1.login);
router.post('/register', (0, schemaValidator_middleware_1.schemaValidation)(auth_schema_1.registerSchema), AuthController_1.registro);
router.get('/renew', validarJwt_1.validatJwt, AuthController_1.renew);
exports.default = router;
