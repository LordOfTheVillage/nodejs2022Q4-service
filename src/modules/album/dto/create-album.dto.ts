import { IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name;
  @IsNumber()
  year;
  @IsString()
  artistId;
}
