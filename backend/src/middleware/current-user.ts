import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    // equivalent !req.session || !req.session.jwt = req.session?.jwt
    if(!req.session?.jwt) {
        return next();
    }
    try{
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload; 
        req.currentUser = payload;
    }
    catch (err) {
        console.log('Invalid token:', (err as Error).message);
    } 

    next();
};