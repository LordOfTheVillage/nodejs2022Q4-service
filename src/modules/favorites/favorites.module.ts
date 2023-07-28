import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesRepository } from './repositories/favorites.repository';
import { FavoritesController } from './controllers/favorites.controller';
import { StoreModule } from '../store/store.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [FavoritesService, FavoritesRepository],
  controllers: [FavoritesController],
  imports: [StoreModule, PrismaModule],
})
export class FavoritesModule {}
