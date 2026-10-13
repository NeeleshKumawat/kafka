import { kafka } from "../config/kafka";
import { ORDER_PLACED_TOPIC } from "../events/order-placed.event";

const consumer = kafka.consumer({ groupId: "analytics-group" });

async function main() {
  await consumer.connect();
  console.log("analytics consumer connected");

  await consumer.subscribe({ topic: ORDER_PLACED_TOPIC, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const event = JSON.parse(message.value?.toString() || '{}');
            console.log(`analytics | partition: ${partition} | offset: ${message.offset} | key: ${message.key?.toString()} | value: ${message.value?.toString()}`);
            console.log(`analytics consumer received event: ${JSON.stringify(event)}`);
            console.log(`send analytics data for order: ${event.orderId} to user: ${event.userId}`);
        }
    });
}



main().catch((err) => {
  console.error(err);
  consumer.disconnect();
  process.exit(1);
});

process.on("SIGINT", async () => {
  console.log("disconnecting analytics consumer...");
  await consumer.disconnect();
  process.exit(0);
});


main().catch((err) => {
  console.error(err);
  consumer.disconnect();
  process.exit(1);
})  