import { Controller, Get, Param } from '@nestjs/common';
import { ArtistService } from '../services/artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  findAll() {
    return this.artistService.findAllArtists();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findArtistById(id);
  }
}
