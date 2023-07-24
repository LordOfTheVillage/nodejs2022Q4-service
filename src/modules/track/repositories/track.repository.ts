import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { StoreService } from '../../store/services/store.service';

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

@Injectable()
export class TrackRepository {
  private readonly tracks: Track[] = null;

  constructor(private readonly storeService: StoreService) {
    this.tracks = this.storeService.getTracks();
  }
  getAllTracks(): Track[] {
    return this.tracks;
  }

  getTrackById(id: string): Track {
    return this.tracks.find((track) => track.id === id);
  }

  createTrack(trackData: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuid(),
      name: trackData.name,
      artistId: trackData.artistId,
      albumId: trackData.albumId,
      duration: trackData.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  updateTrack(id: string, trackData: UpdateTrackDto): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (track) {
      track.name = trackData.name;
      track.artistId = trackData.artistId;
      track.albumId = trackData.albumId;
      track.duration = trackData.duration;
    }
    return track;
  }

  deleteTrack(id: string): boolean {
    return this.storeService.deleteTrack(id);
  }
}
