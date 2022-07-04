import express, { Request, Response } from 'express'; 

const router = express.Router(); 

router.get('/api/orders/:orderID', (req: Request, res: Response) => {

}); 

export { router as showOrderRouter }; 