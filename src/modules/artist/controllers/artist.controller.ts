import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto } from '../dto/create-artist.dto';

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

  @Post()
  create(@Body() body: CreateArtistDto) {
    return this.artistService.createArtist(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateArtistDto) {
    return this.artistService.updateArtistInfo(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
