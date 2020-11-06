import { IsOptional } from "class-validator";



export class EducationDto {


    readonly username: string;

    @IsOptional()
    readonly startDate: Date;

    @IsOptional()
    readonly endDate: Date;

    readonly degree: string;

    readonly institution: string;

    readonly location: string;

    readonly score: string;

    readonly onGoing: boolean;

}  

//     portfolioId: string;
//     startDate: string;
//     endDate: string;
//     degree: string;
//     institution: string;
//     location: number;
//     score: string;