

Distributed event streaming platform

*** Not just a queue

storing a stream of events so many consumers can read it independently

order-service  -> writes an event to kafka

'''json
{
    "eventType": "ORDER_PLACED"
    "orderId": 1141,
    "userId": 1223,
    "amount": 3999
}
'''

stored these event in a topic

multiple services can read the same events

writing as an event log

order.placed topic

offset 0 - order 1 placed
offset 1 - order 2 placed
offset 2 - order 3 placed

consumers do not remove messages from kafka.


each consumer tracks its own position
this position called offset

why its powerful??

events are stored
multiple services can read same event
services can catch up after downtime

new services - fraud service -> can read olds order related events also.

produces and consumer arecompletely devoupled


