import { Prisma } from '@prisma/client';

type UserCreateInput = Omit<Prisma.UserCreateInput, 'id' | 'createdAt'>;

export { UserCreateInput };
