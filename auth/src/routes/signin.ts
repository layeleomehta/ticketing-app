import express, {Request, Response} from 'express'; 
import { body, validationResult } from 'express-validator';

const router = express.Router(); 

router.post('/api/users/signin', 
            [ body('email')
                .isEmail()
                .withMessage("Please enter a valid email!"), 
              body('password')
                .trim()
                .isLength({ min: 4, max: 20 })
                .withMessage("Please enter a password!")
            ],
            (req: Request, res: Response) => {
                const errors = validationResult(req); 

                if(!errors.isEmpty()){
                    return res.send(errors.array()); 
                }

                const { email, password } = req.body; 
                res.send("Hi"); 
})

export { router as signinRouter }; 