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
    if (!isUUID(id)) throw new BadRequestException(`Invalid user id ${id}`);

    const user = this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

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
    if (!isUUID(id)) throw new BadRequestException(`Invalid user id ${id}`);

    const user = this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');

    if (user.password !== oldPassword)
      throw new ForbiddenException('Old password is wrong');

    const { password, ...rest } = this.userRepository.updateUserPassword(
      id,
      newPassword,
    );
    return rest;
  }

  deleteUser(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    const result = this.userRepository.deleteUser(id);
    if (!result) throw new NotFoundException('User not found');
  }
}
