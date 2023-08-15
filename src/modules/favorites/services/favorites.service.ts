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

  async findFavorites() {
    return await this.favoritesRepository.findFavorites();
  }

  async addArtistToFavorites(id: string) {
    this.checkId(id);

    const artist = (await this.favoritesRepository.findArtists()).find(
      (artist) => artist.id === id,
    );
    if (!artist)
      throw new UnprocessableEntityException(`Artist with id ${id} not found`);

    return await this.favoritesRepository.addArtistToFavorites(id);
  }

  async addAlbumToFavorites(id: string) {
    this.checkId(id);

    const album = (await this.favoritesRepository.findAlbums()).find(
      (album) => album.id === id,
    );
    if (!album)
      throw new UnprocessableEntityException(`Album with id ${id} not found`);

    return await this.favoritesRepository.addAlbumToFavorites(id);
  }

  async addTrackToFavorites(id: string) {
    this.checkId(id);

    const track = (await this.favoritesRepository.findTracks()).find(
      (track) => track.id === id,
    );
    if (!track)
      throw new UnprocessableEntityException(`Track with id ${id} not found`);

    return await this.favoritesRepository.addTrackToFavorites(id);
  }

  async deleteArtistFromFavorites(id: string) {
    this.checkId(id);

    const artist = (await this.favoritesRepository.findFavoritesArtists()).find(
      (artist) => artist.id === id,
    );
    if (!artist) throw new NotFoundException(`Artist with id ${id} not found`);

    return await this.favoritesRepository.deleteArtistFromFavorites(id);
  }

  async deleteAlbumFromFavorites(id: string) {
    this.checkId(id);

    const album = (await this.favoritesRepository.findFavoritesAlbums()).find(
      (album) => album.id === id,
    );
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);

    return await this.favoritesRepository.deleteAlbumFromFavorites(id);
  }

  async deleteTrackFromFavorites(id: string) {
    this.checkId(id);

    const track = (await this.favoritesRepository.findFavoritesTracks()).find(
      (track) => track.id === id,
    );
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);

    return await this.favoritesRepository.deleteTrackFromFavorites(id);
  }

  private checkId(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid id ${id}`);
  }
}
