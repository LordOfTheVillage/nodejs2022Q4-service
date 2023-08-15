import { Injectable } from '@nestjs/common';
import { Artist } from '../../artist/repositories/artist.repository';
import { Album } from '../../album/repositories/album.repository';
import { Track } from '../../track/repositories/track.repository';
import { PrismaService } from '../../prisma/services/prisma.service';

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
  private id = '1';
  constructor(private readonly prisma: PrismaService) {}

  private async createFavorites() {
    await this.prisma.favorites.create({
      data: {
        id: this.id,
        artists: {
          connect: [],
        },
        albums: {
          connect: [],
        },
        tracks: {
          connect: [],
        },
      },
    });
  }

  private async checkFavorites() {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: this.id },
    });
    if (!favorites) await this.createFavorites();
  }

  async findFavorites() {
    await this.checkFavorites();

    const favorites = await this.prisma.favorites.findUnique({
      where: { id: this.id },
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
    return {
      artists: favorites.artists.map(({ favoritesId, ...artist }) => artist),
      albums: favorites.albums.map(({ favoritesId, ...album }) => album),
      tracks: favorites.tracks.map(({ favoritesId, ...track }) => track),
    };
  }

  async findFavoritesAlbums() {
    await this.checkFavorites();
    const { albums } = await this.prisma.favorites.findUnique({
      where: { id: this.id },
      include: {
        albums: true,
      },
    });
    return albums;
  }

  async findFavoritesArtists() {
    await this.checkFavorites();
    const { artists } = await this.prisma.favorites.findUnique({
      where: { id: this.id },
      include: {
        artists: true,
      },
    });
    return artists;
  }

  async findFavoritesTracks() {
    await this.checkFavorites();
    const { tracks } = await this.prisma.favorites.findUnique({
      where: { id: this.id },
      include: {
        tracks: true,
      },
    });
    return tracks;
  }

  findArtists() {
    return this.prisma.artist.findMany();
  }

  findAlbums() {
    return this.prisma.album.findMany();
  }

  findTracks() {
    return this.prisma.track.findMany();
  }

  async addTrackToFavorites(id: string) {
    await this.checkFavorites();
    return await this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        tracks: {
          connect: {
            id,
          },
        },
      },
    });
  }

  async addAlbumToFavorites(id: string) {
    await this.checkFavorites();
    return await this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        albums: {
          connect: {
            id,
          },
        },
      },
    });
  }

  async addArtistToFavorites(id: string) {
    await this.checkFavorites();
    return await this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        artists: {
          connect: {
            id,
          },
        },
      },
    });
  }

  async deleteTrackFromFavorites(id: string) {
    await this.checkFavorites();
    return this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        tracks: {
          disconnect: {
            id,
          },
        },
      },
    });
  }

  async deleteAlbumFromFavorites(id: string) {
    await this.checkFavorites();
    return this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        albums: {
          disconnect: {
            id,
          },
        },
      },
    });
  }

  async deleteArtistFromFavorites(id: string) {
    await this.checkFavorites();
    return this.prisma.favorites.update({
      where: { id: this.id },
      data: {
        artists: {
          disconnect: {
            id,
          },
        },
      },
    });
  }
}
