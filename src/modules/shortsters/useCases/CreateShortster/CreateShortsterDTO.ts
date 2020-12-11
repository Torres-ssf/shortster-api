import {
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateShortsterDTO {
  @IsOptional()
  @MinLength(4)
  @MaxLength(255)
  @Matches(/^[0-9a-zA-Z]+$/, {
    message: 'shortster code should contain only numbers and letters',
  })
  code?: string;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  user_id?: string;
}
