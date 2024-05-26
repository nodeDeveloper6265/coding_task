import express from 'express';
import { sendMessage } from '../controllers/RealtimeController';

const router = express.Router();

router.post('/send-message', sendMessage);

export { router as RealtimeRoutes };