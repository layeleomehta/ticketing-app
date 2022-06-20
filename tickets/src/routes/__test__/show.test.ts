import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";

it('returns 404 if ticket not found', async () => {
    await request(app)
        .get('/api/tickets/randomid')
        .send()
        .expect(404); 
}); 

it('returns the ticket if ticket is found', async () => {
    const title = 'example-ticket';
    const price = 20; 

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({ 
            title: 'example', 
            price: 20
        })
        .expect(201); 
    
    console.log(response); 
    
    const ticketResponse = await request(app)
        .post(`/api/tickets/${response.body.id}`)
        .set('Cookie', signin())
        .send({ 
            title, 
            price
        })
        .expect(200); 
    
    expect(ticketResponse.body.title).toEqual(title); 
    expect(ticketResponse.body.price).toEqual(price); 
}); 