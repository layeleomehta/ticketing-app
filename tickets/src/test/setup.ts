import { MongoMemoryServer } from "mongodb-memory-server"; 
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest"; 
import jwt from 'jsonwebtoken'; 

let mongo: any; 
beforeAll(async () => {
    process.env.JWT_KEY = 'secret'; 
    mongo = await MongoMemoryServer.create(); 
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri); 
}); 

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections(); 

    for (let collection of collections){
        await collection.deleteMany({}); 
    }
}); 

afterAll(async () => {
    await mongo.stop(); 
    await mongoose.connection.close(); 
}); 

// 'faking' auth by manually making and returning cookie to set on request obj
export const signin = (id: string, email: string) => {
    // create payload
    const payload = {
        id, 
        email
    }; 

    // create jwt
    const token = jwt.sign(payload, process.env.JWT_KEY!); 
    
    // build session object { jwt: hashed_jwt }; 
    const sessObj = {
        jwt: token
    }; 

    // stringify object into JSON
    const JSONSessionObj = JSON.stringify(sessObj); 

    // turn that JSON into base64 encoded string
    const base64 = Buffer.from(JSONSessionObj).toString('base64'); 

    // return cookie string with encoded data
    return [`session=${base64}`]; 
}