export enum OrderStatus {
    // order created, but ticket it is trying to order has not been reserved
    Created = 'created', 
    // when reservation not available, user cancels or order expires before payment 
    Cancelled = 'cancelled', 
    // when order has been reserved, but payment not made yet
    AwaitingPayment = 'awaiting:payment', 
    // order has reserved ticket, user has provided payment successfully
    Complete = 'complete'
}