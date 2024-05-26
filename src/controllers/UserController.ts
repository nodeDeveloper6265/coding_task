import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import config  from '../typeorm.config';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response) => {
    try {
      const userRepository = config.getRepository(User);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Check if user already exists
      const existingUser = await userRepository.findOne({ where: { username: req.body.username } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create new user
      const newUser = userRepository.create(req.body);
      await userRepository.save(newUser);
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Login user function
  export const loginUser = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { username, password } = req.body;
      const userRepository = config.getRepository(User);
      const user = await userRepository.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.ACCESS_TOKEN_SECRET?process.env.ACCESS_TOKEN_SECRET:"asklladkskl" as string);
  
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Logout user function
  export const logoutUser = async (req: Request, res: Response) => {
    try {
      res.clearCookie('token');
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error logging out user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  