import { IsNotEmpty, MinLength, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly username: string;

}