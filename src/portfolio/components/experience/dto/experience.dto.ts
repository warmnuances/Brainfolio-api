import { IsNotEmpty } from "class-validator";

export class ExperienceDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly type: string;

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly startDate: string;

    @IsNotEmpty()
    readonly endDate: string;

    readonly description: string;

}  

//     portfolioId: string;
//     type: experienceType;
//     title: string;
//     name: string;
//     startDate: string;
//     endDate: number;
//     description: string;