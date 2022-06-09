import express from "express"; 
import { json } from "body-parser"; 
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import mongoose from "mongoose";

const app = express(); 
app.use(json()); 

app.use(signupRouter); 
app.use(signinRouter); 
app.use(signoutRouter); 
app.use(currentUserRouter); 

app.use(errorHandler); 

const start = async () => {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth"); 
        console.log("connected to db"); 
    } catch (err) {
        console.error(err); 
    }
}

app.listen(3000, ()=> {
    console.log("server listening on port 3000"); 
})

start(); 