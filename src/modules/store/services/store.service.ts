import { Injectable } from '@nestjs/common';
import { Album } from '../../album/repositories/album.repository';
import { Artist } from '../../artist/repositories/artist.repository';
import { User } from '../../user/repositories/user.repository';
import { Track } from '../../track/repositories/track.repository';
import { Favorites } from '../../favorites/repositories/favorites.repository';

interface Store {
  albums: Album[];
  artists: Artist[];
  users: User[];
  tracks: Track[];
  favorites: Favorites;
}

@Injectable()
export class StoreService {
  private store: Store = null;

  constructor() {
    this.store = {
      albums: [],
      artists: [],
      users: [],
      tracks: [],
      favorites: {
        artists: [],
        albums: [],
        tracks: [],
      },
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

  getTracks() {
    return this.store.tracks;
  }

  getFavorites() {
    return this.store.favorites;
  }

  deleteAlbum(id: string) {
    const indexFav = this.store.favorites.albums.findIndex(
      (albumId) => albumId === id,
    );
    if (indexFav !== -1) this.store.albums.splice(indexFav, 1);

    const tracks = this.store.tracks.filter((track) => track.albumId === id);
    tracks.forEach((track) => (track.albumId = null));

    const index = this.store.albums.findIndex((album) => album.id === id);
    if (index !== -1) {
      this.store.albums.splice(index, 1);
      return true;
    }
    return false;
  }

  deleteArtist(id: string) {
    const indexFav = this.store.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (indexFav !== -1) this.store.artists.splice(indexFav, 1);

    const albums = this.store.albums.filter((album) => album.artistId === id);
    albums.forEach((album) => (album.artistId = null));

    const tracks = this.store.tracks.filter((track) => track.artistId === id);
    tracks.forEach((track) => (track.artistId = null));

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

  deleteTrack(id: string) {
    const indexFav = this.store.favorites.tracks.findIndex(
      (trackId) => trackId === id,
    );
    if (indexFav !== -1) this.store.tracks.splice(indexFav, 1);

    const index = this.store.tracks.findIndex((track) => track.id === id);
    if (index !== -1) {
      this.store.tracks.splice(index, 1);
      return true;
    }
    return false;
  }

  getFavoritesAlbums(): Album[] {
    const albumsIds = this.store.favorites.albums;
    return this.store.albums.filter((album) => albumsIds.includes(album.id));
  }

  getFavoritesArtists(): Artist[] {
    const artistsIds = this.store.favorites.artists;
    return this.store.artists.filter((artist) =>
      artistsIds.includes(artist.id),
    );
  }

  getFavoritesTracks(): Track[] {
    const tracksIds = this.store.favorites.tracks;
    return this.store.tracks.filter((track) => tracksIds.includes(track.id));
  }
}
