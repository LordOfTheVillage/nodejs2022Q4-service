import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from './services/artist.service';
import { ArtistRepository } from './repositories/artist.repository';
import { StoreModule } from '../store/store.module';

@Module({
  providers: [ArtistRepository, ArtistService],
  controllers: [ArtistController],
  imports: [StoreModule],
})
export class ArtistModule {}
