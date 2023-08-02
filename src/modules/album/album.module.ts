import { Module } from '@nestjs/common';
import { AlbumRepository } from './repositories/album.repository';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';
import { StoreModule } from '../store/store.module';

@Module({
  providers: [AlbumRepository, AlbumService],
  controllers: [AlbumController],
  imports: [StoreModule],
})
export class AlbumModule {}
