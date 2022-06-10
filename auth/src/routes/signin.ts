import express, {NextFunction, Request, Response} from 'express'; 
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from "jsonwebtoken"; 
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router(); 

router.post('/api/users/signin', 
    [ body('email')
        .isEmail()
        .withMessage("Please enter a valid email!"), 
        body('password')
        .trim()
        .notEmpty()
        .withMessage("Please enter a password!")
    ], 
    validateRequest, 
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body; 

        // check if user with the email exists, if not throw error
        const existingUser = await User.findOne({ email }); 
        if(!existingUser){
            return next(new BadRequestError("Invalid credentials!")); 
        }

        // compare hashed password with stored user password, throw error if passwords don't match
        const matchPassword = Password.compare(existingUser.password, password); 
        if(!matchPassword){
             return next(new BadRequestError("Invalid credentials!")); 
        }

        // send back token
        const jwtToken = jwt.sign({
            id: existingUser.id, 
            email: existingUser.email
        }, process.env.JWT_KEY!); 
    
        req.session = {
            jwt: jwtToken
        }; 
    
        res.status(201).send(existingUser); 
})

export { router as signinRouter }; 