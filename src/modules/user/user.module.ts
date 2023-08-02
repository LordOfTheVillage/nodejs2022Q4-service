import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { StoreModule } from '../store/store.module';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  imports: [StoreModule],
})
export class UserModule {}
