import express, { application } from "express"; 
import {json} from "body-parser"; 

const app = express(); 
app.use(json()); 

app.listen(3000, ()=> {
    console.log("server listening on port 3000"); 
})