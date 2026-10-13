export type OrderPlacedEvent = {
  eventId: string;
  orderId: string;
  eventType: 'ORDER_PLACED';
  userId: string;
  amount: number;
  createdAt: string;
}

export const ORDER_PLACED_TOPIC = "order.placed";