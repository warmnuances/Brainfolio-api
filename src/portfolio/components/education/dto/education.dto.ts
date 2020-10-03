import { IsNotEmpty} from "class-validator";



export class EducationDto {
    readonly portfolioId: string;

    readonly startDate: string;

    readonly endDate: string;

    readonly degree: string;

    readonly institution: string;

    readonly location: string;

    readonly score: string;

}  

//     portfolioId: string;
//     startDate: string;
//     endDate: string;
//     degree: string;
//     institution: string;
//     location: number;
//     score: string;