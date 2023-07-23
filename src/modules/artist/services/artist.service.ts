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

  findArtistById(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid artist id ${id}`);

    const artist = this.artistRepository.findArtistById(id);
    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);

    return artist;
  }

  createArtist(artistData: CreateArtistDto) {
    if (!artistData.name || !artistData.grammy)
      throw new BadRequestException('Missing required fields');

    return this.artistRepository.createArtist(artistData);
  }

  updateArtistInfo(id: string, artistData: UpdateArtistDto) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid artist id ${id}`);

    const artist = this.artistRepository.findArtistById(id);
    if (!artist) throw new NotFoundException('Artist not found');

    return this.artistRepository.updateArtistInfo(id, artistData);
  }

  deleteArtist(id: string) {
    if (!isUUID(id)) throw new BadRequestException('Invalid artist ID');

    const result = this.artistRepository.deleteArtist(id);
    if (!result) throw new NotFoundException('Artist not found');
  }
}
