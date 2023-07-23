import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArtistRepository } from '../repositories/artist.repository';
import { isUUID } from '@nestjs/common/utils/is-uuid';

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
}
