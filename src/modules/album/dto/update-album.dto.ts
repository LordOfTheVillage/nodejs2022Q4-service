import { IsNumber, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  name;
  @IsNumber()
  year;
}
