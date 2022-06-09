import express, {NextFunction, Request, Response} from 'express'; 
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { User } from '../models/user';


const router = express.Router(); 

router.post('/api/users/signup',
    [ 
    body('email')
      .isEmail()
      .withMessage("Please enter a valid email!"), 
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Please enter a password!")
    ],
    async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req); 

    if(!errors.isEmpty()){
        next(new RequestValidationError(errors.array())); 
    }

    const { email, password } = req.body; 

    // check if user already exists
    const existingUser = await User.findOne({ email }); 
    if(existingUser){
        console.log("Email is in use"); 
        return res.send({}); 
    }

    // hash password

    // create new user and save in mongodb
    const user = User.build({ email, password }); 
    await user.save(); 

    // send back token to user


    res.status(201).send(user); 

})

export { router as signupRouter }; 