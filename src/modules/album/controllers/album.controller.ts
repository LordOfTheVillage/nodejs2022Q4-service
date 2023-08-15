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
import { AlbumService } from '../services/album.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAllAlbums();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.albumService.findAlbumById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateAlbumDto) {
    return this.albumService.createAlbum(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateAlbumDto) {
    return this.albumService.updateAlbum(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
