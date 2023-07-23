import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './modules/user/controllers/user.controller';
import { UserService } from './modules/user/services/user.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
