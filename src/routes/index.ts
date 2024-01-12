import { Router } from 'express';
import userRoutes from './api/user.routes';

const allRoutes = Router();

allRoutes.use('/users', userRoutes);

export default allRoutes;
