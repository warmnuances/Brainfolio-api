import { IsNotEmpty , IsArray} from "class-validator";

export class ProfileDto {
    _id: string;
    readonly username: string;
    readonly fullName: string;

    readonly address: string;

    readonly email: string;

    readonly phone: string;

    readonly relevantLink: string;

    readonly linkedIn: string;

    readonly title: string;
    
    readonly private: boolean;

    readonly dark: boolean;
    readonly profileToDelete: string;
    readonly backgroundToDelete: string;

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