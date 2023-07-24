import { Module } from '@nestjs/common';
import { AlbumRepository } from './repositories/album.repository';
import { AlbumService } from './services/album.service';
import { AlbumController } from './controllers/album.controller';

@Module({
  providers: [AlbumRepository, AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
