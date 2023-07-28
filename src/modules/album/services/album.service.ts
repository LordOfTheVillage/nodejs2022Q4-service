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

  async findAlbumById(id: string) {
    this.checkId(id);
    const album = await this.checkAlbumExisting(id);

    return album;
  }

  async createAlbum(dto: CreateAlbumDto) {
    return await this.albumRepository.createAlbum(dto);
  }

  async updateAlbum(id: string, dto: UpdateAlbumDto) {
    this.checkId(id);
    await this.checkAlbumExisting(id);

    return await this.albumRepository.updateAlbumInfo(id, dto);
  }

  async deleteAlbum(id: string) {
    this.checkId(id);
    await this.checkAlbumExisting(id);

    return await this.albumRepository.deleteAlbum(id);
  }

  private async checkAlbumExisting(id: string) {
    const album = await this.albumRepository.findAlbumById(id);
    if (!album) throw new NotFoundException(`Album ${id} not found`);
    return album;
  }

  private checkId(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid id ${id}`);
  }
}
