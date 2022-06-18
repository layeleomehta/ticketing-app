import { requireAuth, validateRequest } from "@lm-tickets-microservices/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router(); 

router.post('/api/tickets', [
    body('title').not().isEmpty().withMessage('Title is a required property of a ticket!'), 
    body('price').isFloat({gt: 0}).withMessage('Price must be a float greater than 0')
    ], 
    validateRequest, 
    requireAuth, 
    async (req: Request, res: Response) => {
        res.status(200).send("Hi!"); 
}); 

export { router as createTicketRouter }; 