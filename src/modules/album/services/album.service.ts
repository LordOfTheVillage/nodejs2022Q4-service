import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AlbumRepository } from '../repositories/album.repository';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  findAllAlbums() {
    return this.albumRepository.findAllAlbums();
  }

  findAlbumById(id: string) {
    this.checkId(id);
    const album = this.checkAlbumExisting(id);

    return album;
  }

  createAlbum(dto: CreateAlbumDto) {
    return this.albumRepository.createAlbum(dto);
  }

  updateAlbum(id: string, dto: UpdateAlbumDto) {
    this.checkId(id);
    this.checkAlbumExisting(id);

    return this.albumRepository.updateAlbumInfo(id, dto);
  }

  deleteAlbum(id: string) {
    this.checkId(id);
    this.checkAlbumExisting(id);

    return this.albumRepository.deleteAlbum(id);
  }

  private checkAlbumExisting(id: string) {
    const album = this.albumRepository.findAlbumById(id);
    if (!album) throw new NotFoundException(`Album ${id} not found`);
    return album;
  }

  private checkId(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid id ${id}`);
  }
}
