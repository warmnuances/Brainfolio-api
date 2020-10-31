
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {

    @IsOptional()
    readonly isDarkMode: boolean;

    /** Profile **/
    @IsOptional()
    readonly title: string;

    @IsOptional()
    readonly fullname: string;

    @IsOptional()
    readonly displayEmail: string;

    @IsOptional()
    readonly address: string;

    @IsOptional()
    readonly phone: string;

    @IsOptional()
    readonly github: string;

    @IsOptional()
    readonly linkedIn: string;

    @IsOptional()  
    readonly isPublic: boolean;
    

}  
