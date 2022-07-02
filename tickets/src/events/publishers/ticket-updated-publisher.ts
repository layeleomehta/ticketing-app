import { TicketUpdatedEvent, Publisher, Subjects } from "@lm-tickets-microservices/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated; 
}