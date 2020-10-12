import { IsNotEmpty } from "class-validator";

export class ProjectDto {

    readonly projectId: string;

    readonly title: string;

    readonly startDate: string;

    readonly endDate: string;

    readonly visibility: string;
    
    readonly description: string;

    readonly contributor: string;

    

}  