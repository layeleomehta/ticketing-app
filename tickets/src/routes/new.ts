import { requireAuth } from "@lm-tickets-microservices/common";
import express, { Request, Response } from "express";

const router = express.Router(); 

router.post('/api/tickets', requireAuth, async (req: Request, res: Response) => {
    res.status(200).send("Hi!"); 
}); 

export { router as createTicketRouter }; 