import express from "express"; 
import { json } from "body-parser"; 
import { currentUser, errorHandler } from "@lm-tickets-microservices/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";

const app = express(); 
app.set('trust proxy', true); 
app.use(json()); 
app.use(cookieSession({
    signed: false, 
    secure: process.env.NODE_ENV !== 'test'
})); 

app.use(currentUser); 


app.use(createTicketRouter); 
app.use(showTicketRouter); 



app.use(errorHandler); 

export { app }; 