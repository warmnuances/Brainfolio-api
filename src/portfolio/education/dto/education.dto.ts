import { IsNotEmpty} from "class-validator";



export class EducationDto {
    @IsNotEmpty()
    readonly portfolioId: string;

    @IsNotEmpty()
    readonly startDate: string;

    @IsNotEmpty()
    readonly endDate: string;

    @IsNotEmpty()
    readonly degree: string;

    @IsNotEmpty()
    readonly institution: string;

    @IsNotEmpty()
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