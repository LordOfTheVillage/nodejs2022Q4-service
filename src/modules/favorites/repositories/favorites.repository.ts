import { Injectable } from '@nestjs/common';
import { StoreService } from '../../store/services/store.service';
import { Artist } from '../../artist/repositories/artist.repository';
import { Album } from '../../album/repositories/album.repository';
import { Track } from '../../track/repositories/track.repository';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

@Injectable()
export class FavoritesRepository {
  private readonly favorites: Favorites = null;
  constructor(private readonly storeService: StoreService) {
    this.favorites = this.storeService.getFavorites();
  }

  findFavorites(): FavoritesResponse {
    return {
      artists: this.findFavoritesArtists(),
      albums: this.findFavoritesAlbums(),
      tracks: this.findFavoritesTracks(),
    };
  }

  findFavoritesAlbums() {
    return this.storeService.getFavoritesAlbums();
  }

  findFavoritesArtists() {
    return this.storeService.getFavoritesArtists();
  }

  findFavoritesTracks() {
    return this.storeService.getFavoritesTracks();
  }

  addTrackToFavorites(id: string) {
    this.favorites.tracks.push(id);
  }

  addAlbumToFavorites(id: string) {
    this.favorites.albums.push(id);
  }

  addArtistToFavorites(id: string) {
    this.favorites.artists.push(id);
  }

  deleteTrackFromFavorites(id: string) {
    const index = this.favorites.tracks.findIndex((trackId) => trackId === id);
    if (index !== -1) {
      this.favorites.tracks.splice(index, 1);
    }
  }

  deleteAlbumFromFavorites(id: string) {
    const index = this.favorites.albums.findIndex((albumId) => albumId === id);
    if (index !== -1) {
      this.favorites.albums.splice(index, 1);
    }
  }

  deleteArtistFromFavorites(id: string) {
    const index = this.favorites.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (index !== -1) {
      this.favorites.artists.splice(index, 1);
    }
  }
}
