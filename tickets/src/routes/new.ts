import { requireAuth, validateRequest } from "@lm-tickets-microservices/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router(); 

router.post('/api/tickets', [
    body('title').not().isEmpty().withMessage('Title is a required property of a ticket!'), 
    body('price').isFloat({gt: 0}).withMessage('Price must be a float greater than 0')
    ], 
    validateRequest, 
    requireAuth, 
    async (req: Request, res: Response) => {
        const { title, price } = req.body; 

        const ticket = Ticket.build({
            title, 
            price, 
            userId: req.currentUser!.id
        }); 
        await ticket.save(); 

        new TicketCreatedPublisher(natsWrapper.client).publish({
            id: ticket.id, 
            title: ticket.title,  
            price: ticket.price, 
            userId: ticket.userId
        }); 
        console.log("published TicketCreatedEvent to NATS")
        res.status(201).send(ticket); 
}); 

export { router as createTicketRouter }; 