import express from 'express';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import allRoutes from './routes';

const app = express();

app.use(express.json());
app.use(allRoutes);

app.all('*', async () => {
  throw new NotFoundError('Route not found');
});

app.use(errorHandler);
export { app };
