import express from "express"; 
import { json } from "body-parser"; 
import { currentUser, errorHandler } from "@lm-tickets-microservices/common";
import cookieSession from "cookie-session";
import { indexOrderRouter } from './routes/index'; 
import { showOrderRouter } from "./routes/show";
import { deleteOrderRouter } from "./routes/delete";
import { newOrderRouter } from "./routes/new";

const app = express(); 
app.set('trust proxy', true); 
app.use(json()); 
app.use(cookieSession({
    signed: false, 
    secure: process.env.NODE_ENV !== 'test'
})); 

app.use(currentUser); 

app.use(indexOrderRouter); 
app.use(showOrderRouter); 
app.use(deleteOrderRouter); 
app.use(newOrderRouter); 

app.use(errorHandler); 

export { app }; 