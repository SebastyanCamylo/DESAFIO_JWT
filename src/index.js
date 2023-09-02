import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from '../routes/autentication.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));