import { IsNotEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DarkModeDto {
  
  @ApiProperty()
  @IsNotEmpty()
  readonly isDarkMode: boolean;

}