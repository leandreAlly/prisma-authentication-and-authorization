import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { ConflictRequestError } from '../errors/conflict-request-error';
import { asyncWrapper } from '../middlewares/async-wrapper';
import { getUserByEmail, registerUser } from '../services/user.service';
import { PasswordUtil } from '../utils/password.util';
import { UserLogin } from '../utils/types';
import { NotFoundError } from '../errors/not-found-error';
import { JwtUtil } from '../utils/jwt.util';

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

const signIn = asyncWrapper(
  async (req: Request<{}, {}, UserLogin>, res: Response) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    if (!user) throw new NotFoundError('Invalid credential');

    const isPasswordValid = await PasswordUtil.compareHash(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) throw new NotFoundError('Invalid credential');

    const { id, email: userEmail, name, createdAt } = user;
    const token = await JwtUtil.generateToken({
      id,
      email,
    });

    req.session = {
      jwt: token,
    };

    return res.status(200).json({
      message: 'logged in successfull',
      data: { id, name, email, token },
    });
  }
);

export { signUp, signIn };
