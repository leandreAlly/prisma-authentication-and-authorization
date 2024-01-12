import { Router } from 'express';
import { signUp } from '../../controllers/user.controller';

const userRoutes = Router();

userRoutes.post('/register', signUp);

export default userRoutes;
