import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from "../dto/create-user.dto";
import { Injectable } from "@nestjs/common";

export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

const users: User[] = [];

@Injectable()
export class UserRepository {
  private users: User[] = users;

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(userData: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
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
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
