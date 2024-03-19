import { model, Schema, Document } from 'mongoose';

export interface IUsuario extends Document {
    name: string;
    email:string;
    password: string;
}

const usuarioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    }
});



export default model<IUsuario>("Usuario",usuarioSchema);