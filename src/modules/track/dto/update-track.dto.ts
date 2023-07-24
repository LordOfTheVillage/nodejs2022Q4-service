import { IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name;
  @IsString()
  text;
  @IsNumber()
  duration;
  artistId;
  albumId;
}
