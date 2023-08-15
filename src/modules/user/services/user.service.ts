import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAllUsers() {
    const users = await this.userRepository.findAllUsers();
    return users.map((user) => {
      return this.getUser(user);
    });
  }

  async findUserById(id: string) {
    this.checkId(id);
    const user = await this.checkUserExists(id);

    return this.getUser(user);
  }

  async createUser(userData: CreateUserDto) {
    const user = await this.userRepository.createUser(userData);
    return this.getUser(user);
  }

  async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    this.checkId(id);
    const user = await this.checkUserExists(id);

    if (user.password !== oldPassword)
      throw new ForbiddenException('Old password is wrong');

    const updatedUser = await this.userRepository.updateUserPassword(
      id,
      newPassword,
    );
    return this.getUser(updatedUser);
  }

  async deleteUser(id: string) {
    this.checkId(id);
    await this.checkUserExists(id);

    return this.userRepository.deleteUser(id);
  }

  private async checkUserExists(id: string) {
    const user = await this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  private checkId(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid user id ${id}`);
  }

  private getUser(user: any) {
    const { password, ...rest } = user;
    return {
      ...rest,
      updatedAt: Number(new Date(user.updatedAt)),
      createdAt: Number(new Date(user.createdAt)),
    };
  }
}
