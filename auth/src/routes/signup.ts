import express, {Request, Response} from 'express'; 

const router = express.Router(); 

router.post('/api/users/signup', (req: Request, res: Response) => {
    res.send("Signup"); 
})

export { router as signupRouter }; 