import { Request, Response } from "express";
import Evento from "../models/Evento";

export const getEventos = async(req:Request, res:Response) => {
    const eventos = await Evento.find().populate('user','name');
    res.json({
        eventos
    })
}

export const crearEvento = async(req:Request, res:Response) => {
    try {
        const evento = new Evento(req.body);
        //@ts-ignorets-ignore
        evento.user = req.uid;
        await evento.save();
        res.status(201).json({
            evento
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Ha ocurrido n error al crear un evento'
        })
    }
}

export const actualizaEvento = async({ params, body, uid }:any, res:Response) => {
    const eventoId = params.id;

    try {
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                message: 'Evento no existe por ese id'
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                message: 'No tienes privilegios para editar el evento'
            });
        }

        const nuevoEvento = { ...body, user: uid };

        const eventoUp = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new:true });

        res.status(201).json({
            evento: eventoUp
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Ha ocurrido n error al crear un evento'
        });
    }
}

export const eliminaEvento = async({ params,uid }:any, res:Response) => {
    const eventoId = params.id;

    try {
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                message: 'Evento no existe por ese id'
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                message: 'No tienes privilegios para eliminar el evento'
            });
        }

        await Evento.findByIdAndDelete(eventoId);

        res.status(201).json();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Ha ocurrido n error al crear un evento'
        });
    }
}