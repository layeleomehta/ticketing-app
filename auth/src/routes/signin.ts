import express, {Request, Response} from 'express'; 
import { body } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';

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
    (req: Request, res: Response) => {
        const { email, password } = req.body; 

        // check if user with the email exists, if not throw error
        const existingUser = await User.findOne({ email }); 
        if(!existingUser){
        }

        // compare hashed password with stored user password, throw error if passwords don't match

        // send back token
})

export { router as signinRouter }; 