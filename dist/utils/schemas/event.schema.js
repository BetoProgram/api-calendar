"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventoCrearSchema = void 0;
const zod_1 = require("zod");
exports.eventoCrearSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Titulo es requerido"),
        start: zod_1.z.string().datetime(),
        end: zod_1.z.string().datetime()
    })
});
