import { IsNotEmpty } from "class-validator";

export class ProfileDto {
    @IsNotEmpty()
    readonly portfolioId: string;

    @IsNotEmpty()
    readonly fullName: string;

    readonly address: string;

    readonly email: string;

    readonly phone: string;

    readonly relevantLink: string;

    readonly linkedIn: string;

    readonly title: string;

    //Profile Image insert
    //Background Image insert

}  

    // portfolioId: string;
    // fullName: string;
    // address: string;
    // email: string;
    // phone: string;
    // relevantLink: number;
    // linkedIn: string;
    // title:string;
    // //Profile Image insert
    // //Background Image insert