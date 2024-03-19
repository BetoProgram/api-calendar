import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const validatJwt = (req:any, res:Response, next: NextFunction) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            message: 'No se a enviado token en la peticion'
        });
    }

    try{
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED as string) as any;
        req.uid = uid;
        req.name = name;
    }catch(error){
        return res.status(401).json({
            message: 'Token no valido'
        });
    }

    next();
}