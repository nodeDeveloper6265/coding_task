import { Request, Response } from 'express';
import { io } from '../index'; // Import Socket.IO instance

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    io.emit('message', message); // Emit message to all clients
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
