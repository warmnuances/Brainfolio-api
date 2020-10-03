import { IsNotEmpty } from "class-validator";

export enum experienceType {
    Work, Volunteer
}  

export class ExperienceDto {
    @IsNotEmpty()
    readonly portfolioId: string;

    @IsNotEmpty()
    readonly type: string;

    @IsNotEmpty()
    readonly title: experienceType;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly startDate: number;

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