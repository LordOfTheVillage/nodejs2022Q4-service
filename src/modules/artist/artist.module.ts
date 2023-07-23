import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from './services/artist.service';
import { ArtistRepository } from './repositories/artist.repository';
@Module({
  providers: [ArtistService, ArtistRepository],
  controllers: [ArtistController],
})
export class ArtistModule {}
