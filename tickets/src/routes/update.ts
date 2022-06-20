import express, { NextFunction, Request, Response } from 'express'; 
import { Ticket } from '../models/ticket';
import {

} from "@lm-tickets-microservices/common"; 

const router = express.Router(); 

router.put('/api/tickets/:id', async (req: Request, res: Response, next: NextFunction) => {

}); 

export { router as updateTicketRouter }; 