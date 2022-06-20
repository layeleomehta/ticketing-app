import express, { Request, Response } from 'express'; 
import { Ticket } from '../models/ticket';

const router = express.Router(); 

router.get('/api/tickets', async (req: Request, res: Response) => {
    const allTickets = await Ticket.find({}); 

    res.status(200).send(allTickets); 

}); 

export { router as indexTicketRouter };