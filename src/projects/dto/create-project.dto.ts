import { IsNotEmpty, IsArray } from "class-validator";

export class ProjectDto {

     _id: string;

    readonly title: string;

    readonly startDate: string;

    readonly endDate: string;

    readonly visibility: string;
    
    readonly description: string;

    readonly contributor: string[][];

    @IsArray()
    readonly filesToDelete: string[];

    // readonly files: string[][];

    

}  