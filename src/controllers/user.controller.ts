import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { ConflictRequestError } from '../errors/conflict-request-error';
import { asyncWrapper } from '../middlewares/async-wrapper';
import { getUserByEmail, registerUser } from '../services/user.service';
import { PasswordUtil } from '../utils/password.util';

const signUp = asyncWrapper(
  async (req: Request<{}, {}, User>, res: Response) => {
    const { email } = req.body;

    const existUser = await getUserByEmail(email);
    if (existUser) {
      throw new ConflictRequestError('Email is already exists');
    }

    const hashedPassword = await PasswordUtil.toHash(req.body.password);
    const userData = {
      ...req.body,
      password: hashedPassword,
    };

    const { password, ...userInfo } = await registerUser(userData);

    return res
      .status(201)
      .json({ message: 'signed up successfull', data: userInfo });
  }
);

export { signUp };
