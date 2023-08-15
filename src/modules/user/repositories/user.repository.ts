import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';

export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers() {
    return await this.prisma.user.findMany();
  }

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(userData: CreateUserDto) {
    return await this.prisma.user.create({ data: userData });
  }

  async updateUserPassword(id: string, newPassword: string) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: { increment: 1 },
      },
    });
  }

  async deleteUser(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
