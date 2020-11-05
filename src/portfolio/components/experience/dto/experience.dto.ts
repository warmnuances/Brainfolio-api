import { IsNotEmpty } from "class-validator";

export class ExperienceDto {
    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly type: string;

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly companyName: string;

    @IsNotEmpty()
    readonly startDate: Date;

    @IsNotEmpty()
    readonly endDate: Date;

    readonly description: string;

    readonly onGoing: boolean;
}  

//     portfolioId: string;
//     type: experienceType;
//     title: string;
//     name: string;
//     startDate: string;
//     endDate: number;
//     description: string;