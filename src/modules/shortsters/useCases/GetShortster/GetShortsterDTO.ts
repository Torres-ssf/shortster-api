import { IsString, MaxLength, MinLength } from 'class-validator';

export class GetShortsterDTO {
  @MinLength(4)
  @MaxLength(255)
  @IsString()
  code: string;
}
