import { IsNotEmpty, MinLength, IsEmail, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly visibility: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly visibilitylist: string[];


}