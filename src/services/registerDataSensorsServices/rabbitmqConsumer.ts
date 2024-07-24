import dotenv from 'dotenv';
import amqp, { Connection, Channel, Message } from 'amqplib/callback_api';
import axios from 'axios';

dotenv.config();

export function startRabbitMQConsumer(): void {
  const rabbitmqHost: string = process.env.RABBITMQ_HOST || '';
  const rabbitmqUser: string = process.env.RABBITMQ_USER || '';
  const rabbitmqPassword: string = process.env.RABBITMQ_PASSWORD || '';
  const rabbitmqExchange: string = process.env.RABBITMQ_EXCHANGE || '';
  const rabbitmqQueue: string = process.env.RABBITMQ_QUEUE || '';
  const rabbitmqRoutingKey: string = process.env.RABBITMQ_ROUTING_KEY || '';

  function connectToRabbitMQ(): void {
    amqp.connect(`amqp://${rabbitmqUser}:${rabbitmqPassword}@${rabbitmqHost}`, (error0: any, connection: Connection) => {
      if (error0) {
        console.error('Error al conectar con RabbitMQ:', error0.message);
        setTimeout(connectToRabbitMQ, 15000);
        return;
      }

      connection.createChannel((error1: any, channel: Channel) => {
        if (error1) {
          console.error('Error al crear el canal:', error1.message);
          setTimeout(connectToRabbitMQ, 15000);
          return;
        }
        channel.assertExchange(rabbitmqExchange, 'topic', { durable: true });
        channel.assertQueue(rabbitmqQueue, { durable: true });
        channel.bindQueue(rabbitmqQueue, rabbitmqExchange, rabbitmqRoutingKey);

        console.log('Esperando mensajes. Para salir, presiona CTRL+C');

        channel.consume(rabbitmqQueue, (msg: Message | null) => {
          if (msg && msg.content) {
            try {
              const message = JSON.parse(msg.content.toString());
              console.log('Mensaje recibido:', message);

              sendToAnotherAPI(message);
            } catch (error) {
              console.error('Error al parsear el mensaje JSON:', error);
              console.log('Contenido del mensaje:', msg.content.toString());
            }
          }
        }, { noAck: true });
      });
    });
  }

  function sendToAnotherAPI(data: any): void {
    const apiUrl = 'http://localhost:3000/products';

    axios.post(apiUrl, data, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        console.log('Respuesta de la API:', response.data);
      })
      .catch(error => {
        console.error('Error al enviar los datos a la API:', error.message);
      });
  }

  connectToRabbitMQ();
}
