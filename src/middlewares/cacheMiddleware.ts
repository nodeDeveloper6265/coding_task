import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';

const cache = new NodeCache();

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Caching logic
};

