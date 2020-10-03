import { IsNotEmpty } from "class-validator";

export class SkillsDto {
    @IsNotEmpty()
    readonly portfolioId: string;

    @IsNotEmpty()
    readonly category: string;

    readonly name: string;

    readonly rating: string;

    readonly priority: string;

}  

// portfolioId: string;
// category: string;
// title: string;
// name: string;
// rating: string;
// priority: number;