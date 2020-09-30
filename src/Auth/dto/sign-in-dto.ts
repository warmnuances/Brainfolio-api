import { IsNotEmpty, MinLength, IsEmail, IsString } from 'class-validator';

export class SignInDto {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;


}