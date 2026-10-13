import { kafka } from "../config/kafka";
import {
  ORDER_PLACED_TOPIC,
  OrderPlacedEvent,
} from "../events/order-placed.event";

const producer = kafka.producer();

let orderNumber = 1;

function createOrderPlacedEvent(): OrderPlacedEvent {
  const userId = `user-${Math.ceil(Math.random() * 10)}`;
  return {
    eventId: crypto.randomUUID(),
    eventType: "ORDER_PLACED",
    orderId: `order-${orderNumber++}`,
    userId,
    amount: Math.ceil(Math.random() * 1000),
    createdAt: new Date().toISOString(),
  };
}

async function main() {
  await producer.connect();
  console.log("order producer connected");

  setInterval(async () => {
    const event = createOrderPlacedEvent();
    await producer.send({
      topic: ORDER_PLACED_TOPIC,
      messages: [{ key: event.orderId, value: JSON.stringify(event) }],
    });
  }, 2000);

  console.log(`producing events to topic: ${ORDER_PLACED_TOPIC}`);
}

main().catch((err) => {
  console.error(err);
  producer.disconnect();
  process.exit(1);
});

process.on("SIGINT", async () => {
  console.log("disconnecting order producer...");
  await producer.disconnect();
  process.exit(0);
});


main().catch((err) => {
  console.error(err);
  producer.disconnect();
  process.exit(1);
})  