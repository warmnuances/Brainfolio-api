import { IsNotEmpty, MinLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;


}