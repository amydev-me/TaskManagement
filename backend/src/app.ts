import express from 'express';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import { json } from 'body-parser'; 
import 'express-async-errors';
import cors from 'cors';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './errors/error-handler';
import { setupRoutes } from './routes';


dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN, // Update this to match your frontend URL
    credentials: true,              // Allow credentials (cookies)
};
  
app.use(cors(corsOptions));
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