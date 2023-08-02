import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { StoreService } from '../../store/services/store.service';

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

@Injectable()
export class AlbumRepository {
  private readonly albums: Album[] = null;

  constructor(private readonly storeService: StoreService) {
    this.albums = this.storeService.getAlbums();
  }

  findAllAlbums(): Album[] {
    return this.albums;
  }

  findAlbumById(id: string): Album {
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
      album.artistId = albumData.artistId;
    }
    return album;
  }

  deleteAlbum(id: string): boolean {
    return this.storeService.deleteAlbum(id);
  }
}
