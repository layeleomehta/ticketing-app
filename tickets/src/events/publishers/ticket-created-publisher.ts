import { TicketCreatedEvent, Publisher, Subjects } from "@lm-tickets-microservices/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated; 
}