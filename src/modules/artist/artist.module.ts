import { Module } from '@nestjs/common';
import { ArtistController } from './controllers/artist.controller';
import { ArtistService } from './services/artist.service';
import { ArtistRepository } from './repositories/artist.repository';
import { StoreModule } from '../store/store.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ArtistRepository, ArtistService],
  controllers: [ArtistController],
  imports: [StoreModule, PrismaModule],
})
export class ArtistModule {}
