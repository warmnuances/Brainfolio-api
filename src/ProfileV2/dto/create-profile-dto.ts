
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {

    @ApiProperty()
    @IsOptional()
    readonly isDarkMode: boolean;

    /** Profile **/
    @ApiProperty()
    @IsOptional()
    readonly title: string;

    @IsOptional()
    @ApiProperty()
    readonly fullname: string;

    @IsOptional()
    @ApiProperty()
    readonly displayEmail: string;

    @IsOptional()
    @ApiProperty()
    readonly address: string;

    @ApiProperty()
    readonly phone: string;

    @IsOptional()
    @ApiProperty()
    readonly github: string;

    @IsOptional()
    @ApiProperty()
    readonly linkedIn: string;

    @IsOptional()
    @ApiProperty()  
    readonly isPublic: boolean;

    @IsOptional()
    @ApiProperty()  
    readonly description: string;

    @IsOptional()
    @ApiProperty()  
    readonly profileImage: string;

    @IsOptional()
    @ApiProperty()  
    readonly backgroundImage: string;
    

}  
