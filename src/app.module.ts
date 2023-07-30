import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { StoreModule } from './modules/store/store.module';
import { TrackModule } from './modules/track/track.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { LoggerModule } from './modules/logger/logger.module';
import { RequestLoggingMiddleware } from './modules/middlewares/request-logging.middleware';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AlbumModule,
    StoreModule,
    ArtistModule,
    TrackModule,
    FavoritesModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggingMiddleware).forRoutes('*');
  }
}
