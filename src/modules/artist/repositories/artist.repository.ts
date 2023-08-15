import { v4 as uuid } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

@Injectable()
export class ArtistRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllArtists() {
    return this.prisma.artist.findMany();
  }

  findArtistById(id: string) {
    return this.prisma.artist.findUnique({ where: { id } });
  }

  createArtist(artistData: CreateArtistDto) {
    return this.prisma.artist.create({ data: artistData });
  }

  updateArtistInfo(id: string, artistData: UpdateArtistDto) {
    return this.prisma.artist.update({ where: { id }, data: artistData });
  }

  deleteArtist(id: string) {
    return this.prisma.artist.delete({ where: { id } });
  }
}
