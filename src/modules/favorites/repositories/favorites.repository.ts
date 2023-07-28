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
  constructor(private readonly prisma: PrismaService) {
    this.prisma.favorites.create({
      data: {
        id: this.id,
      },
    });
  }

  findFavorites() {
    return this.prisma.favorites.findUnique({
      where: { id: this.id },
      include: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });
  }

  async findFavoritesAlbums() {
    const { albums } = await this.prisma.favorites.findUnique({
      where: { id: this.id },
      include: {
        albums: true,
      },
    });
    return albums;
  }

  async findFavoritesArtists() {
    const { artists } = await this.prisma.favorites.findUnique({
      where: { id: this.id },
      include: {
        artists: true,
      },
    });
    return artists;
  }

  async findFavoritesTracks() {
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

  addTrackToFavorites(id: string) {
    return this.prisma.favorites.update({
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

  addAlbumToFavorites(id: string) {
    return this.prisma.favorites.update({
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

  addArtistToFavorites(id: string) {
    return this.prisma.favorites.update({
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

  deleteTrackFromFavorites(id: string) {
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

  deleteAlbumFromFavorites(id: string) {
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

  deleteArtistFromFavorites(id: string) {
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
