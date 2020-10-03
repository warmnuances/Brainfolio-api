import { IsNotEmpty, MinLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail({},{message: "Invalid Email!"})
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6,{message: "Password length does not meet requirements"})
  readonly password: string;


}