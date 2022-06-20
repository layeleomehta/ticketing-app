import request from "supertest"; 
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { signin } from "../../test/setup";


it('has route handler listening on /api/tickets for post request', async () => {
    const response = await request(app)
                        .post("/api/tickets")
                        .send({}); 
    console.log(response.text); 
    expect(response.status).not.toEqual(404); 
}); 

it('returns 401 error if user not signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(400); 
}); 

it('does not return 401 error if user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({}); 

    console.log(response.status); 
    
    expect(response.status).not.toEqual(401); 
}); 

it('returns error if invalid title is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title: '', 
            price: 10
        })
        .expect(400); 

    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({ 
            price: 10
        })
        .expect(400); 
}); 

it('returns error if invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title: 'example', 
            price: -10
        })
        .expect(400); 

    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({ 
            title: 'example'
        })
        .expect(400); 
    
}); 

it('creates ticket when valid inputs provided', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);  
    
    await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({ 
            title: 'example', 
            price: 20
        })
        .expect(201); 

    tickets = await Ticket.find(({})); 
    console.log(tickets); 
    expect(tickets.length).toEqual(1); 
}); 