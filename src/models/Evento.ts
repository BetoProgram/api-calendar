import { model, Schema, Document } from 'mongoose';
import { IUsuario } from './Usuario';

export interface IEvento extends Document {
    title:string;
    notes:string;
    start: Date;
    end: Date;
    user: string;
}

const eventoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type:Date,
        required:true
    },
    end: {
        type:Date,
        required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    }
});

eventoSchema.method('toJSON', function() {
    //@ts-ignore
    const { __v, _id, ...object } = this.toObject();
    //@ts-ignore
    object.id = _id;
    return object;
})


export default model<IEvento>("Evento",eventoSchema);