import { IsNotEmpty, IsArray, IsBoolean } from "class-validator";

export class ProjectDto {

     _id: string;

    readonly title: string;

    startDate: Date;

    endDate: Date;

    onGoing: boolean;
    
    isPublic: boolean;
    
    readonly description: string;

    readonly contributor: string[][];

    @IsArray()
    readonly filesToDelete: string[];

    // readonly files: string[][];

    

}  