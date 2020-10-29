import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsArray, IsBoolean } from "class-validator";

export class ProjectDto {

    @ApiPropertyOptional()
    readonly _id: string;

    @ApiPropertyOptional()
    contributor: string[];

    @ApiPropertyOptional()
    readonly startDate: Date;

    @ApiPropertyOptional()
    readonly endDate: Date;

    @ApiPropertyOptional()
    readonly onGoing: boolean;
    
    @ApiPropertyOptional()
    readonly isPublic: boolean;

    @ApiPropertyOptional()
    readonly title: string;
    
    @ApiPropertyOptional()
    readonly description: string;

    @ApiPropertyOptional()
    readonly youtubeLink : string;

    @ApiPropertyOptional()
    readonly filesToDelete: string[];

    // readonly files: string[][];

    

}  