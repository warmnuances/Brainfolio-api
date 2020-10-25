import { IsNotEmpty } from "class-validator";

export class SkillsDto {
    readonly username: string;

    readonly category: string;

    readonly name: string;

    readonly rating: string;

}  

// portfolioId: string;
// category: string;
// title: string;
// name: string;
// rating: string;
// priority: number;