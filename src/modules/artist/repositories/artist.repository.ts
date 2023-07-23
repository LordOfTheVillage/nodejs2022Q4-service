import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

const artists: Artist[] = [];

Injectable();
export class ArtistRepository {
  private artists: Artist[] = artists;

  findAllArtists(): Artist[] {
    return this.artists;
  }

  findArtistById(id: string): Artist {
    return this.artists.find((artist) => artist.id === id);
  }

  createArtist(artistData: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
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
    const index = this.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      this.artists.splice(index, 1);
      return true;
    }
    return false;
  }
}
