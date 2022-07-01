import nats from "node-nats-streaming"; 
import { TicketCreatedPublisher } from './events/ticket-created-publisher'; 

console.clear(); 

const stan: any = nats.connect('ticketing', 'abc', {
    url: "http://localhost:4222"
}); 

stan.on('connect', () => {
    console.log("Publisher connected to NATS"); 

    const publisher = new TicketCreatedPublisher(stan); 
    const data = {
        id: '123', 
        title: 'example-ticket', 
        price: 30
    }; 
    publisher.publish(data); 

    
}); 
