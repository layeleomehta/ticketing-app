import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";

it('returns 404 if provided id does not work', async () => {
    const id = new mongoose.Types.ObjectId().toHexString(); 
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', signin("exampleId", "example@example.com"))
        .send({
            title: 'example', 
            price: 10
        })
        .expect(404); 
}); 

it('returns 401 if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString(); 
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'example', 
            price: 10
        })
        .expect(401); 

}); 

it('returns 401 if the user does not own the ticket', async () => {
    // create new ticket
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', signin("exampleId", "example@example.com"))
        .send({
            title: 'example', 
            price: 10
        })
        .expect(201); 

    // request to update that same ticket, but with different cookie (as a different user), expect a 401 error
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', signin("otherExampleId", "otherExample@example.com"))
        .send({
            title: 'differentexample', 
            price: 10000
        })
        .expect(401); 

}); 

it('returns 400 if user provides invalid title or price', async () => {
    // create new ticket
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin("exampleId", "example@example.com"))
    .send({
        title: 'example', 
        price: 10
    })
    .expect(201); 

    // update ticket with invalid title, expect validation error
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', signin("exampleId", "example@example.com"))
    .send({
        title: '', 
        price: 100
    })
    .expect(400); 

    // update ticket with invalid price, expect validation error
    await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', signin("exampleId", "example@example.com"))
    .send({
        title: 'validTitle', 
        price: -10
    })
    .expect(400); 

}); 

it('correctly updates ticket when provided proper inputs', async () => {
    // create new ticket
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', signin("exampleId", "example@example.com"))
    .send({
        title: 'example', 
        price: 10
    })
    .expect(201); 

    // update ticket with valid title and price
    const updatedTicket = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', signin("exampleId", "example@example.com"))
    .send({
        title: 'newExample', 
        price: 100
    })
    .expect(200); 

    // expect title and price change
    expect(updatedTicket.body.title).toEqual('newExample'); 
    expect(updatedTicket.body.price).toEqual(100); 
}); 