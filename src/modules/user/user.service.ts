import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) {}

  getAllUsers() {
    return this._prisma.user.findMany();
  }

  getUser(id: string) {
    return this._prisma.user.findUnique({
      where: { id },
    });
  }

  getUserByEmail(email: string) {
    return this._prisma.user.findUnique({
      where: { email },
    });
  }

  createUser(data: Prisma.UserCreateInput) {
    return this._prisma.user.create({
      data
    });
  }
}
