import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import Usuario from "../models/Usuario";
import { generarJWT } from "../utils/jwt";

export const login = async (req:Request, res:Response) => {
    const {email, password} = req.body;

    try{
        let usuario = await Usuario.findOne({ email });

        if(!usuario){
            return res.status(400).json({
                message: `El usuario no existe con ese email`
            });
        }
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(validPassword === false){
            return res.status(400).json({
                message: 'Contraseña no es vilida'
            });
        }

        const token = await generarJWT(usuario._id, usuario.name);
        
        res.status(200).json({
            uid: usuario._id,
            name: usuario.name,
            token
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: 'Error al crear el usuario' });
    }

}

export const registro = async (req:Request, res:Response) => {
    try{
        const { name, email, password } = req.body;

        let usuario = await Usuario.findOne({ email });

        if(usuario){
            return res.status(400).json({
                message: `El usuario ${email} ya esta registrado`
            });
        }

        usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario._id, usuario.name);

        res.status(201).json({ 
            message: 'Usuario creado',
            uid: usuario._id,
            name: usuario.name,
            token
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({ message: 'Error al crear el usuario' });
    }
}

export const renew = async (req:any, res:Response) => {
    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name);

    res.json({ uid, name, token });
}