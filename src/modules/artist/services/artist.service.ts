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
    this.checkId(id);
    const artist = this.checkArtistExists(id);

    return artist;
  }

  createArtist(artistData: CreateArtistDto) {
    return this.artistRepository.createArtist(artistData);
  }

  updateArtistInfo(id: string, artistData: UpdateArtistDto) {
    this.checkId(id);
    this.checkArtistExists(id);

    return this.artistRepository.updateArtistInfo(id, artistData);
  }

  deleteArtist(id: string) {
    this.checkId(id);
    this.checkArtistExists(id);

    return this.artistRepository.deleteArtist(id);
  }

  checkArtistExists(id: string) {
    const artist = this.artistRepository.findArtistById(id);
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  checkId(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid artist id ${id}`);
  }
}
