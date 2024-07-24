import { Server as SocketIOServer, Socket } from 'socket.io';

let io: SocketIOServer | undefined;

export function initAndEmitSocket(ioServer: SocketIOServer): void {
  io = ioServer;

  io.on('connection', (socket: Socket) => {
    console.log('Cliente conectado');

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });

  // Función para emitir datos
  function emitSensorData(data: any): void {
    if (io) {
      console.log("se esta mandando el dato del evento")
      io.emit('sensorData', data);
      console.log('Mensaje enviado');
    } else {
      console.log('WebSocket no inicializado');
    }
  }

  // Puedes exportar la función emitSensorData si necesitas usarla fuera de esta función
  (global as any).emitSensorData = emitSensorData; // Opcional, solo si necesitas usarlo globalmente
}
