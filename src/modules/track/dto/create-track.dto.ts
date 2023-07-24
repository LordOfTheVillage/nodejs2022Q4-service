import { IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name;
  @IsString()
  text;
  @IsNumber()
  duration;
  artistId;
  albumId;
}
