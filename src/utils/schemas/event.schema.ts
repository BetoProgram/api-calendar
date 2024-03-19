import { z } from 'zod';


export const eventoCrearSchema = z.object({
    body: z.object({
        title: z.string().min(1,"Titulo es requerido"),
        start: z.string().datetime(),
        end: z.string().datetime()
    })
})