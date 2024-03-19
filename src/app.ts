import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import auth from './routes/auth';
import { dbConnection } from './database/config'
import events from './routes/events';

dotenv.config();
dbConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', auth);
app.use('/api/eventos', events);

export default app;