import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { isUUID } from '@nestjs/common/utils/is-uuid';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  findAllUsers() {
    return this.userRepository.findAllUsers();
  }

  findUserById(id: string) {
    if (!isUUID(id)) throw new NotFoundException(`Invalid user id ${id}`);

    const user = this.userRepository.findUserById(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  createUser(userData: CreateUserDto) {
    return this.userRepository.createUser(userData);
  }

  updateUserPassword(id: string, newPassword: string) {
    return this.userRepository.updateUserPassword(id, newPassword);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
