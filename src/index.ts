import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { UserRoutes } from './routes/userRoutes';
import { initializeDataSource } from './typeorm.config';
import { RealtimeRoutes } from './routes/realtimeRoutes';

const app = express();
const server = http.createServer(app); 
const io = new Server(server);

export { io };

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/users', UserRoutes);
app.use('/api/realtime', RealtimeRoutes);


io.on('connection', (socket: Socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('message', (data: any) => {
    console.log('Received message:', data);
    io.emit('message', data);
  });
});

initializeDataSource().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });