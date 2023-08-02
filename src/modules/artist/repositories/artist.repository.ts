import { v4 as uuid } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Injectable } from '@nestjs/common';
import { StoreService } from '../../store/services/store.service';

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

@Injectable()
export class ArtistRepository {
  private readonly artists: Artist[] = null;

  constructor(private readonly storeService: StoreService) {
    this.artists = this.storeService.getArtists();
  }

  findAllArtists(): Artist[] {
    return this.artists;
  }

  findArtistById(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  createArtist(artistData: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuid(),
      name: artistData.name,
      grammy: artistData.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  updateArtistInfo(id: string, artistData: UpdateArtistDto): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (artist) {
      artist.name = artistData.name;
      artist.grammy = artistData.grammy;
    }
    return artist;
  }

  deleteArtist(id: string): boolean {
    return this.storeService.deleteArtist(id);
  }
}
