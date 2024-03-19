import { z } from 'zod';

export const loginSchema = z.object({
    body: z.object({
        email: z.string().min(1,"Email es requerido").email('Email no es valido'),
        password: z.string().min(1, "Password es requerido").min(6, "Password es demasiado corto"),
    })
})

export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(1,"Nombre es requerido"),
        email: z.string().min(1,"Email es requerido").email('Email no es valido'),
        password: z.string().min(1, "Password es requerido").min(6, "Password es demasiado corto"),
    })
})