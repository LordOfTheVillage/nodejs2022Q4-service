import { Injectable } from '@nestjs/common';
import { Album } from '../../album/repositories/album.repository';
import { Artist } from '../../artist/repositories/artist.repository';
import { User } from '../../user/repositories/user.repository';

interface Store {
  albums: Album[];
  artists: Artist[];
  users: User[];
}

@Injectable()
export class StoreService {
  private store: Store = null;

  constructor() {
    this.store = {
      albums: [],
      artists: [],
      users: [],
    };
  }

  getAlbums() {
    return this.store.albums;
  }

  getArtists() {
    return this.store.artists;
  }

  getUsers() {
    return this.store.users;
  }

  deleteAlbum(id: string) {
    const index = this.store.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      this.store.albums.splice(index, 1);
      return true;
    }
    return false;
  }

  deleteArtist(id: string) {
    const albums = this.store.albums.filter((album) => album.artistId === id);
    albums.forEach((album) => (album.artistId = null));

    const index = this.store.artists.findIndex((artist) => artist.id === id);
    if (index !== -1) {
      this.store.artists.splice(index, 1);
      return true;
    }
    return false;
  }

  deleteUser(id: string) {
    const index = this.store.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.store.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
