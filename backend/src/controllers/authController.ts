import { Request, Response } from "express";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-requests";
import { Password } from "../services/Password";
import jwt from 'jsonwebtoken';

const getCurrentUser = async(req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null });
}

const signIn = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });

    if(!existingUser) {
        throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(existingUser.password, password);

    if(!passwordsMatch){
        throw new BadRequestError('Invalid password');
    }

    const userJwt = jwt.sign({ 
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    req.session = {
        jwt : userJwt
    };

    res.status(200).send({
        message: "Success"
    });
}

const signUp = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });

    if(existingUser) {
        throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });

    await user.save();

    const token = jwt.sign({
        id: user.id,
        email: user.email,

    }, process.env.JWT_KEY!);


    req.session = {
        jwt : token
    };

    res.status(201).send(user);
}
const signOut = (req: Request, res: Response) => {
    req.session = null;
    res.clearCookie('jwt');
    res.send({})
}

export {
    getCurrentUser, 
    signUp,
    signIn,
    signOut
}