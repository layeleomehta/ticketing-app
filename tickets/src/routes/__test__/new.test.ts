import request from "supertest"; 
import { app } from "../../app";

it('has route handler listening on /api/tickets for post request', async () => {
    const response = await request(app)
                        .post("/api/tickets")
                        .send({}); 
    console.log(response.text); 
    expect(response.status).not.toEqual(404); 
}); 

it('can only be accessed if user signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401); 
}); 

it('returns error if invalid title is provided', async () => {
    
}); 

it('returns error if invalid price is provided', async () => {
    
}); 

it('creates ticket when valid inputs provided', async () => {
    
}); 