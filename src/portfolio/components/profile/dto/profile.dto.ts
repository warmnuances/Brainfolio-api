import { IsNotEmpty , IsArray} from "class-validator";

export class ProfileDto {
    _id: string;
    readonly username: string;


    readonly fullname: string;

    readonly address: string;

    readonly email: string;

    readonly phone: string;

    readonly relevantLink: string;

    readonly linkedIn: string;

    readonly title: string;
    
    readonly isPublic: boolean;
    
    readonly dark: boolean;
    
    readonly profileToDelete: string;

    readonly backgroundToDelete: string;

}  
