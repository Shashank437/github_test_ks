import { IsNotEmpty } from 'class-validator';

export class CityDto {
  @IsNotEmpty()
  name: string;
}
