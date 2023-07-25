import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from '../repositories/favorites.repository';
import { isUUID } from '@nestjs/common/utils/is-uuid';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  findFavorites() {
    return this.favoritesRepository.findFavorites();
  }

  addArtistToFavorites(id: string) {
    this.checkId(id);

    const artist = this.favoritesRepository
      .findArtists()
      .find((artist) => artist.id === id);
    if (!artist)
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);

    this.favoritesRepository.addArtistToFavorites(id);
  }

  addAlbumToFavorites(id: string) {
    this.checkId(id);

    const album = this.favoritesRepository
      .findAlbums()
      .find((album) => album.id === id);
    if (!album)
      throw new UnprocessableEntityException(`Album with id ${id} not found`);

    this.favoritesRepository.addAlbumToFavorites(id);
  }

  addTrackToFavorites(id: string) {
    this.checkId(id);

    const track = this.favoritesRepository
      .findTracks()
      .find((track) => track.id === id);
    if (!track)
      throw new UnprocessableEntityException(`Track with id ${id} not found`);

    this.favoritesRepository.addTrackToFavorites(id);
  }

  deleteArtistFromFavorites(id: string) {
    this.checkId(id);

    const artist = this.favoritesRepository
      .findFavoritesArtists()
      .find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);

    this.favoritesRepository.deleteArtistFromFavorites(id);
  }

  deleteAlbumFromFavorites(id: string) {
    this.checkId(id);

    const album = this.favoritesRepository
      .findFavoritesAlbums()
      .find((album) => album.id === id);
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);

    this.favoritesRepository.deleteAlbumFromFavorites(id);
  }

  deleteTrackFromFavorites(id: string) {
    this.checkId(id);

    const track = this.favoritesRepository
      .findFavoritesTracks()
      .find((track) => track.id === id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);

    this.favoritesRepository.deleteTrackFromFavorites(id);
  }

  private checkId(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid id ${id}`);
  }
}
