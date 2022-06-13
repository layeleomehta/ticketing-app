import express, {NextFunction, Request, Response} from 'express'; 
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
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
    validateRequest,
    async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body; 

    // check if user already exists
    const existingUser = await User.findOne({ email }); 
    if(existingUser){
        return next(new BadRequestError('Email in use')); 
    }
    

    // create new user and save in mongodb, password is hashed in mongo pre 'save' hook in user.ts
    const user = User.build({ email, password }); 
    await user.save(); 

    // create JWT and send back to user as cookie
    const jwtToken = jwt.sign({
        id: user.id, 
        email: user.email
    }, process.env.JWT_KEY!); 

    req.session = {
        jwt: jwtToken
    }; 

    res.status(201).send(user); 

})

export { router as signupRouter }; 