"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().min(1, "Email es requerido").email('Email no es valido'),
        password: zod_1.z.string().min(1, "Password es requerido").min(6, "Password es demasiado corto"),
    })
});
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Nombre es requerido"),
        email: zod_1.z.string().min(1, "Email es requerido").email('Email no es valido'),
        password: zod_1.z.string().min(1, "Password es requerido").min(6, "Password es demasiado corto"),
    })
});
