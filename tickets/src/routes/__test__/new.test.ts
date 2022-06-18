import request from "supertest"; 
import { app } from "../../app";
import { signin } from "../../test/setup";


it('has route handler listening on /api/tickets for post request', async () => {
    const response = await request(app)
                        .post("/api/tickets")
                        .send({}); 
    console.log(response.text); 
    expect(response.status).not.toEqual(404); 
}); 

it('returns 401 error if user not signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401); 
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
    
}); 

it('returns error if invalid price is provided', async () => {
    
}); 

it('creates ticket when valid inputs provided', async () => {
    
}); 