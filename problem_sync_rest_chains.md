sync rest chains -
one service directly calls multiple other service during the same user req


order-service

immdiate calls 
noti-service - to send mail
analytics-service - track the order
inventory-service - to update stock

one service - noti-service slows down (let) -> it slows the full request

analutics-service - 3sec

```ts
try {
    await createOrder(orderData)
    await notiUser(orderData)
    await analytics(orderData)
    await updateInventory(orderData)
}
'''


Creates messy code 

adding  a new service can be problematic

how ??

order-service -> should not care about who needs the order event

