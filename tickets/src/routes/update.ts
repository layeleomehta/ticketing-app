import express, { NextFunction, Request, Response } from 'express'; 
import { Ticket } from '../models/ticket';
import {
    NotAuthorizedError,
    NotFoundError,
    requireAuth, 
    validateRequest
} from "@lm-tickets-microservices/common"; 
import { body } from 'express-validator';
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher"; 
import { natsWrapper } from '../nats-wrapper';


const router = express.Router(); 

router.put('/api/tickets/:id', [
    body('title').not().isEmpty().withMessage('Title is a required property of a ticket!'), 
    body('price').isFloat({gt: 0}).withMessage('Price must be a float greater than 0')
    ], 
    validateRequest,
    requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        return next(new NotFoundError()); 
    }

    if(ticket.userId !== req.currentUser!.id){
        return next(new NotAuthorizedError()); 
    }

    ticket.set({
        title: req.body.title, 
        price: req.body.price
    }); 
    await ticket.save(); 

    new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id, 
        title: ticket.title,  
        price: ticket.price, 
        userId: ticket.userId, 
    }); 
    console.log("published TicketUpdatedEvent to NATS")
    res.status(200).send(ticket); 

}); 

export { router as updateTicketRouter }; 