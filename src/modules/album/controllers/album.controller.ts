import { Controller, Get, Param } from '@nestjs/common';
import { AlbumService } from '../services/album.service';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get('')
  findAll() {
    return this.albumService.findAllAlbums();
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.albumService.findAlbumById(id);
  }
}
