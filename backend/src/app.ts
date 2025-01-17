import express from 'express';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import { json } from 'body-parser'; 
import 'express-async-errors';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './errors/error-handler';
import { setupRoutes } from './routes';


dotenv.config();

const app = express();

app.use(json()); 

app.use(
    cookieSession({
        signed: false,
        secure: false
    })
); 

setupRoutes(app);

app.all('*', async (req, res, next) => {
    next(new NotFoundError());
});

app.use(errorHandler);

export { app };