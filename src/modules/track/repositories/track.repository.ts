import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { PrismaService } from '../../prisma/services/prisma.service';

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

@Injectable()
export class TrackRepository {
  constructor(private readonly prisma: PrismaService) {}
  getAllTracks() {
    return this.prisma.track.findMany();
  }

  getTrackById(id: string) {
    return this.prisma.track.findUnique({ where: { id } });
  }

  createTrack(trackData: CreateTrackDto) {
    return this.prisma.track.create({ data: trackData });
  }

  updateTrack(id: string, trackData: UpdateTrackDto) {
    return this.prisma.track.update({ where: { id }, data: trackData });
  }

  deleteTrack(id: string) {
    return this.prisma.track.delete({ where: { id } });
  }
}
