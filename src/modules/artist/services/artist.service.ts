import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtistRepository } from '../repositories/artist.repository';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  findAllArtists() {
    return this.artistRepository.findAllArtists();
  }

  async findArtistById(id: string) {
    this.checkId(id);
    return await this.checkArtistExists(id);
  }

  createArtist(artistData: CreateArtistDto) {
    return this.artistRepository.createArtist(artistData);
  }

  async updateArtistInfo(id: string, artistData: UpdateArtistDto) {
    this.checkId(id);
    await this.checkArtistExists(id);

    return this.artistRepository.updateArtistInfo(id, artistData);
  }

  async deleteArtist(id: string) {
    this.checkId(id);
    await this.checkArtistExists(id);

    return this.artistRepository.deleteArtist(id);
  }

  private async checkArtistExists(id: string) {
    const artist = await this.artistRepository.findArtistById(id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  private checkId(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid artist id ${id}`);
  }
}
