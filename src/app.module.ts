import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { StoreModule } from './modules/store/store.module';
import { TrackModule } from './modules/track/track.module';

@Module({
  imports: [UserModule, AlbumModule, StoreModule, ArtistModule, TrackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
