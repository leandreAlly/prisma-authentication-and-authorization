import { UserCreateInput } from '../utils/types';
import { prisma } from '../utils/prisma.client.util';

const registerUser = async (data: UserCreateInput) =>
  await prisma.user.create({ data });

const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export { getUserByEmail, registerUser };
