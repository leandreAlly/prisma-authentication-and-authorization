import { Router } from 'express';
import { signIn, signUp } from '../../controllers/user.controller';

const userRoutes = Router();

userRoutes.post('/register', signUp);
userRoutes.post('/signin', signIn);

export default userRoutes;
