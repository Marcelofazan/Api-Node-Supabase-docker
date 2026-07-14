import express from 'express';
import cors from 'cors';

import pacienteRouter from './routes/paciente.route.js'
import sessaoRouter from './routes/sessao.route.js'

const app = express();

app.use(express.json());
app.use(cors());

app.use('/paciente', pacienteRouter);
app.use('/sessao', sessaoRouter);

export default app;