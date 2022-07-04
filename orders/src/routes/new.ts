import { validateRequest, requireAuth } from '@lm-tickets-microservices/common';
import express, { Request, Response } from 'express'; 
import { body } from 'express-validator';
import mongoose from 'mongoose';


const router = express.Router(); 

router.post('/api/orders', 
    requireAuth, 
    [
        body('ticketId')
            .not()
            .isEmpty()
            .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
            .withMessage('Ticket ID must be provided in field "ticketId"')
    ],
    validateRequest, 
(req: Request, res: Response) => {

}); 

export { router as newOrderRouter }; 