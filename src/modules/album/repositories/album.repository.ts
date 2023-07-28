import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { PrismaService } from '../../prisma/services/prisma.service';

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

@Injectable()
export class AlbumRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllAlbums() {
    return this.prisma.album.findMany();
  }

  findAlbumById(id: string) {
    return this.prisma.album.findUnique({ where: { id } });
  }

  async createAlbum(albumData: CreateAlbumDto) {
    return await this.prisma.album.create({ data: albumData });
  }

  updateAlbumInfo(id: string, albumData: UpdateAlbumDto) {
    return this.prisma.album.update({ where: { id }, data: albumData });
  }

  deleteAlbum(id: string) {
    return this.prisma.album.delete({ where: { id } });
  }
}
