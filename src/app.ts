import express from 'express';
import cookieSession from 'cookie-session';
import { NotFoundError } from 'error-ease';
import allRoutes from './routes';
import { errorHandler } from 'error-ease';

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV != 'test',
  })
);

app.use(allRoutes);
app.all('*', async () => {
  throw new NotFoundError('Route not found');
});

app.use(errorHandler);

export { app };
