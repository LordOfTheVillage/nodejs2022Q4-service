import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumRepository } from '../repositories/album.repository';
import { isUUID } from '@nestjs/common/utils/is-uuid';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  findAllAlbums() {
    return this.albumRepository.findAllAlbums();
  }

  findAlbumById(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid id ${id}`);

    const album = this.albumRepository.findAlbumById(id);
    if (!album) throw new NotFoundException(`Album ${id} not found`);

    return album;
  }
}
