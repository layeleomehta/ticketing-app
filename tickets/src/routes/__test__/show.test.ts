import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";

it('returns 404 if ticket not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString(); 
    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404); 
}); 

it('returns the ticket if ticket is found', async () => {
    const title = 'example-ticket';
    const price = 20; 

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', signin("exampleId", "example@example.com"))
        .send({ 
            title,
            price
        })
        .expect(201); 
    
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200); 
    
    expect(ticketResponse.body.title).toEqual(title); 
    expect(ticketResponse.body.price).toEqual(price); 
}); 