import mongoose from "mongoose";

export const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.DB_CNN as string);
        console.log('Base de datos conectada')
    }catch(error){
        console.log(error);
        throw new Error('Error al conectar con la base de datos');
    }
}