import nats from "node-nats-streaming"; 

console.clear(); 

const stan: any = nats.connect('ticketing', 'abc', {
    url: "http://localhost:4222"
}); 

stan.on('connect', () => {
    console.log("Publisher connected to NATS"); 

    const data = JSON.stringify({
        id: '123', 
        title: 'example-ticket', 
        price: 30
    }); 
    
    stan.publish('ticket:created', data, () => {
        console.log('published a new ticket event'); 
    }); 
}); 
