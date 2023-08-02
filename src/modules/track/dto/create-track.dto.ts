import { IsNumber, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name;
  @IsNumber()
  duration;
  artistId;
  albumId;
}
