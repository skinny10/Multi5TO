import express from 'express';
import { Signale } from 'signale';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { loadRouter } from './event/LoadRouter';
import { productRouter } from './product/infrastructure/ProductRouter';

import { startRabbitMQConsumer } from './services/registerDataSensorsServices/rabbitmqConsumer';
import { initAndEmitSocket } from './services/registerDataSensorsServices/socketHandler';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'],
});

const signale = new Signale();

app.use(express.json());
app.use('/products', productRouter);
app.use('/load', loadRouter);

// Configurar Socket.IO
initAndEmitSocket(io);

io.on('connection', (socket) => {
  signale.success('A client connected');
  socket.on('disconnect', () => {
    signale.success('A client disconnected');
  });
});

app.set('io', io);

startRabbitMQConsumer();

server.listen(3000, () => {
  signale.success('Server online in port 3000');
});
