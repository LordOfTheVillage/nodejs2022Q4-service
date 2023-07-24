import { IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name;
  @IsNumber()
  duration;
  artistId;
  albumId;
}
