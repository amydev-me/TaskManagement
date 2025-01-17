import { Router } from 'express';
import { validationRequest } from '../middleware/validate-requests';
import { body } from 'express-validator'; 
import { currentUser } from '../middleware/current-user';
import { getCurrentUser, signIn, signOut, signUp } from '../controllers/authController';

const router = Router();

router.get('/api/users/currentuser', currentUser, getCurrentUser);

router.post('/api/users/signin',[
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
], 
validationRequest, signIn);

router.post('/api/users/signup', signUp);

router.post('/api/users/signout', signOut);

export { router as authRouter };