import { IsNotEmpty, IsArray, IsBoolean } from "class-validator";

export class ProjectDto {

     _id: string;

    contributor //accept 2d array

    startDate: Date;

    endDate: Date;

    onGoing: boolean;
    
    isPublic: boolean;

    readonly title: string;
    
    readonly description: string;

    readonly youtubeLink : string;

    readonly filesToDelete: string[];

    // readonly files: string[][];

    

}  