import express from 'express';
import cors from 'cors';
import dotevn from 'dotenv';

dotevn.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors())

import summarizeRouter from './routes/route.js';
app.use('/api', summarizeRouter);

app.listen(port, ()=>{
    console.log(`Listen on the port ${port}`);
})