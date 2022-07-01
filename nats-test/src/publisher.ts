import nats from "node-nats-streaming"; 
import { TicketCreatedPublisher } from './events/ticket-created-publisher'; 

console.clear(); 

const stan: any = nats.connect('ticketing', 'abc', {
    url: "http://localhost:4222"
}); 

stan.on('connect', async () => {
    console.log("Publisher connected to NATS"); 

    try {
        const publisher = new TicketCreatedPublisher(stan); 
        const data = {
            id: '123', 
            title: 'example-ticket', 
            price: 30
        }; 
        await publisher.publish(data); 
    } catch (err) {
        console.error(err); 
    }

    
}); 
