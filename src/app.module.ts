import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { StoreModule } from './modules/store/store.module';
import { TrackModule } from './modules/track/track.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config) => ({
        type: 'postgres',
        url: config.getOrThrow('DATABASE_URL'),
      }),
    }),
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
