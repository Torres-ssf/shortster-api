import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateSessionDTO {
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password should have at least one number, one symbol, one lower case, and one upper case',
  })
  password: string;
}
