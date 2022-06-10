import express, {Request, Response} from 'express'; 
import { body } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { validateRequest } from '../middlewares/validate-request';

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
                res.send("Hi"); 
})

export { router as signinRouter }; 