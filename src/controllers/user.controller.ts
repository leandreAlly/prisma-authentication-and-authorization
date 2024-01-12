import { Request, Response } from 'express';
import { User } from '@prisma/client';
import { getUserByEmail, registerUser } from '../services/user.service';
import { ConflictRequestError } from '../errors/conflict-request-error';
import { PasswordUtil } from '../utils/password.util';

const signUp = async (req: Request<{}, {}, User>, res: Response) => {
  const { email, password, name } = req.body;

  const existUser = await getUserByEmail(email);
  if (existUser) throw new ConflictRequestError('User already exist');

  const hashedpassword = await PasswordUtil.toHash(password);
  const userData = {
    email,
    password: hashedpassword,
    name,
  };

  await registerUser(userData);

  return res.status(201).json({ message: 'signed up successfull', userData });
};

export { signUp };
