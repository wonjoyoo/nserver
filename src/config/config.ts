import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  credentials: false, exposedHeaders: ['total'],
};