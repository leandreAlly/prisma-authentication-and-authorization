import { Prisma } from '@prisma/client';

export type UserCreateInput = Omit<Prisma.UserCreateInput, 'id' | 'createdAt'>;

export type UserLogin = Omit<
  Prisma.UserCreateInput,
  'id' | 'name' | 'createdAt'
>;
export type DecodedToken = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};
