import {Kafka} from "kafkajs";

export const kafka = new Kafka({
    clientId: 'kafka',
    brokers: ['localhost:9092']
})