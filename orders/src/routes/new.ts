import { validateRequest, requireAuth, NotFoundError, BadRequestError } from '@lm-tickets-microservices/common';
import express, { NextFunction, Request, Response } from 'express'; 
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';


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
async (req: Request, res: Response, next: NextFunction) => {
    const { ticketId } = req.body; 
    // find ticket that user is trying to order in the database
    const ticket = await Ticket.findById(ticketId); 

    if(!ticket) {
        return next(new NotFoundError()); 
    }

    // make sure ticket is not already reserved
    const isReserved = await ticket.isReserved(); 
    if(isReserved) {
        return next(new BadRequestError('Ticket is already reserved!'));
    } 

    // make sure ticket not expired

    // build order, save to db

    // publish order created event 


}); 

export { router as newOrderRouter }; 