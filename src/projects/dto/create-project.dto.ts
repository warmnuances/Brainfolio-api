import { IsNotEmpty, IsArray, IsBoolean } from "class-validator";

export class ProjectDto {

     _id: string;

    

    startDate: Date;

    endDate: Date;

    onGoing: boolean;
    
    isPublic: boolean;

    readonly title: string;
    
    readonly description: string;

    readonly contributor: string[][];

    readonly youtubeLink : string;

    @IsArray()
    readonly filesToDelete: string[];

    // readonly files: string[][];

    

}  