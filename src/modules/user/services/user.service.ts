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

  findAllUsers() {
    const users = this.userRepository.findAllUsers();
    return users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  findUserById(id: string) {
    this.checkId(id);
    const user = this.checkUserExists(id);

    const { password, ...rest } = user;
    return rest;
  }

  createUser(userData: CreateUserDto) {
    const { password, ...rest } = this.userRepository.createUser(userData);
    return rest;
  }

  updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    this.checkId(id);
    const user = this.checkUserExists(id);

    if (user.password !== oldPassword)
      throw new ForbiddenException('Old password is wrong');

    const { password, ...rest } = this.userRepository.updateUserPassword(
      id,
      newPassword,
    );
    return rest;
  }

  deleteUser(id: string) {
    this.checkId(id);
    this.checkUserExists(id);

    return this.userRepository.deleteUser(id);
  }

  checkUserExists(id: string) {
    const user = this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  checkId(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid user id ${id}`);
  }
}
