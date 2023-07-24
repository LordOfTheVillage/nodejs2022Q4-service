import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

const albums: Album[] = [];

@Injectable()
export class AlbumRepository {
  private albums: Album[] = albums;

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    return this.albums.find((album) => album.id === id);
  }

  createAlbum(albumData: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuid(),
      name: albumData.name,
      year: albumData.year,
      artistId: albumData.artistId,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbumInfo(id: string, albumData: UpdateAlbumDto): Album {
    const album = this.albums.find((album) => album.id === id);
    if (album) {
      album.name = albumData.name;
      album.year = albumData.year;
    }
    return album;
  }

  deleteAlbum(id: string): boolean {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      this.albums.splice(index, 1);
      return true;
    }
    return false;
  }
}
