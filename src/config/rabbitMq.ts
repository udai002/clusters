import amqplib from 'amqplib'

let channel:amqplib.Channel;


export async function conntectRabbitMq(){
    try{
        console.log(process.env.RABBITMQ_HOSTNAME)
        const connection = await amqplib.connect({
            protocol:"amqp" , 
            hostname:process.env.RABBITMQ_HOSTNAME , 
            username:process.env.RABBITMQ_USERNAME, 
            password:process.env.RABBITMQ_PASSWORD , 
            port:5672
        })

        channel = await connection.createChannel()
        console.log("RabbitMQ connected successfully...")
    }catch(error){
        console.log("Failed to connect to RabbitMq..." , error)
    }
}

export async function publishQueue(queueName:string , message:any){
    if(!channel){
        console.log("RabbitMq channel is not initialized...")
        throw new Error("RabbitMq channel is not initialized...")
    }

    await channel.assertQueue(queueName , {durable:true})
    await channel.sendToQueue(queueName , Buffer.from(JSON.stringify(message)))
}
