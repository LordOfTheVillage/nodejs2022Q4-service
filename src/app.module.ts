import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { StoreModule } from './modules/store/store.module';
import { TrackModule } from './modules/track/track.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    StoreModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
