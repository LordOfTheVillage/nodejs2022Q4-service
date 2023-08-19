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
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from '../services/artist.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { AccessTokenGuard } from '../../../guards/access-token.guard';

@UseGuards(AccessTokenGuard)
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
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateArtistDto) {
    return this.artistService.createArtist(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateArtistDto) {
    return this.artistService.updateArtistInfo(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
