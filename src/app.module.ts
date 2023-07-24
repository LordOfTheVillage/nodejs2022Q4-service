import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { StoreModule } from './modules/store/store.module';

@Module({
  imports: [UserModule, AlbumModule, StoreModule, ArtistModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
