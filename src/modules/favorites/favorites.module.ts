import { Module } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { FavoritesRepository } from './repositories/favorites.repository';
import { FavoritesController } from './controllers/favorites.controller';
import { StoreService } from '../store/services/store.service';

@Module({
  providers: [FavoritesService, FavoritesRepository],
  controllers: [FavoritesController],
  imports: [StoreService],
})
export class FavoritesModule {}
