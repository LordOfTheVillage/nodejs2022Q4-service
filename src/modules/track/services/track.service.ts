import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TrackRepository } from '../repositories/track.repository';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  getAllTracks() {
    return this.trackRepository.getAllTracks();
  }

  getTrackById(id: string) {
    this.checkId(id);
    const track = this.checkExisting(id);

    return track;
  }

  createTrack(body: CreateTrackDto) {
    return this.trackRepository.createTrack(body);
  }

  updateTrack(id: string, body: UpdateTrackDto) {
    this.checkId(id);
    this.checkExisting(id);

    return this.trackRepository.updateTrack(id, body);
  }

  deleteTrack(id: string) {
    this.checkId(id);
    this.checkExisting(id);

    return this.trackRepository.deleteTrack(id);
  }

  private checkId(id: string) {
    if (!isUUID(id)) throw new BadRequestException(`Invalid id ${id}`);
  }

  private checkExisting(id: string) {
    const track = this.trackRepository.getTrackById(id);
    if (!track) throw new NotFoundException(`Track with id ${id} not found`);
    return track;
  }
}
