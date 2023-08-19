import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavoritesService } from '../services/favorites.service';
import { AccessTokenGuard } from '../../../guards/access-token.guard';

@UseGuards(AccessTokenGuard)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites() {
    return this.favoritesService.findFavorites();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorites(@Param('id') id: string) {
    return this.favoritesService.addArtistToFavorites(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favoritesService.addAlbumToFavorites(id);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorites(@Param('id') id: string) {
    return this.favoritesService.addTrackToFavorites(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteArtistFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteArtistFromFavorites(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteAlbumFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrackFromFavorites(@Param('id') id: string) {
    return this.favoritesService.deleteTrackFromFavorites(id);
  }
}
