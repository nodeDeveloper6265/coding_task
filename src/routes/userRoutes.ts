import express from 'express';
import { check } from 'express-validator';
import { registerUser, loginUser, logoutUser } from '../controllers/UserController';

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
  ],
  registerUser
);

router.post(
  '/login',
  [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
  ],
  loginUser
);

router.post('/logout', logoutUser);

export { router as UserRoutes };