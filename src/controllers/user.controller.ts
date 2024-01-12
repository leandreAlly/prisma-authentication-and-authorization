import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import { getUserByEmail, registerUser } from '../services/user.service';
import { ConflictRequestError } from '../errors/conflict-request-error';
import { PasswordUtil } from '../utils/password.util';
import { asyncWrapper } from '../middlewares/async-wrapper';

const signUp = asyncWrapper(
  async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;

    const existUser = await getUserByEmail(email);
    if (existUser) {
      throw new ConflictRequestError('Email is already exists');
    }

    const hashedpassword = await PasswordUtil.toHash(password);
    const userData = {
      email,
      password: hashedpassword,
      name,
    };

    const user = await registerUser(userData);

    return res
      .status(201)
      .json({ message: 'signed up successfull', data: user });
  }
);

export { signUp };
