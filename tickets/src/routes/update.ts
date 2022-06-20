import express, { NextFunction, Request, Response } from 'express'; 
import { Ticket } from '../models/ticket';
import {
    NotAuthorizedError,
    NotFoundError,
    requireAuth
} from "@lm-tickets-microservices/common"; 

const router = express.Router(); 

router.put('/api/tickets/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        return next(new NotFoundError()); 
    }

    if(ticket.userId !== req.currentUser!.id){
        return next(new NotAuthorizedError()); 
    }

    res.send(ticket); 

}); 

export { router as updateTicketRouter }; 