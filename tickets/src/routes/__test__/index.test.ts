import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";

const createTicket = (ticketName: string, ticketPrice: number) => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title: ticketName, 
            price: ticketPrice
        }); 
}; 

it('returns an array of tickets when api call is made', async () => {
    await createTicket('ticket1', 10); 
    await createTicket('ticket2', 20); 
    await createTicket('ticket3', 30); 

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200); 
    
    expect(response.body.length).toEqual(3); 

}); 