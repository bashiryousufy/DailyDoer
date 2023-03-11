const bcrypt = require('bcrypt');
import { PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient();

type TUser = Omit<User, "id" | "createdAt" | "updatedAt">;

function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

function createUserByEmailAndPassword(user: TUser) {
  user.password = bcrypt.hashSync(user.password, 12);
  return prisma.user.create({
    data: user,
  });
}

function findUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

function getAllUsers() {
  return prisma.user.findMany();
}


export {
  findUserByEmail,
  findUserById,
  createUserByEmailAndPassword,
  getAllUsers
};