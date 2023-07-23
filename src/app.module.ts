import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';

@Module({
  imports: [UserModule, ArtistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
