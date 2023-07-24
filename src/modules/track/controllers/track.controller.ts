import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from '../services/track.service';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateTrackDto) {
    return this.trackService.createTrack(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateTrackDto) {
    return this.trackService.updateTrack(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
