import express from 'express';
import cookieSession from 'cookie-session';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import allRoutes from './routes';

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
