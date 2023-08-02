import { v4 as uuid } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { StoreService } from '../../store/services/store.service';

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
  private readonly users: User[] = null;

  constructor(private readonly storeService: StoreService) {
    this.users = this.storeService.getUsers();
  }

  findAllUsers(): User[] {
    return this.users;
  }

  findUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(userData: CreateUserDto): User {
    const newUser: User = {
      id: uuid(),
      login: userData.login,
      password: userData.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUserPassword(id: string, newPassword: string): User {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
    }
    return user;
  }

  deleteUser(id: string): boolean {
    return this.storeService.deleteUser(id);
  }
}
