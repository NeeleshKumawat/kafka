

queue - buffer between services


order sevice  - publish a message to a queue 

order service does not wait for the noti sevice to finisjh sending the email


once the order is placed
'''json
{
    "eventType": "ORDER_PLACED"
    "orderId": 1141,
    "userId": 1223
}
'''

order service puts this msg into the queue
noti service consume it and send the mail

system is less tigthly coupled. 


message usually removed after processing

consuled is already consumed -> remove3d from the queue
background jobs

analytics service -> new service -> process orders from last 7 days.

