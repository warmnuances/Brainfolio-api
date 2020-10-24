import { IsNotEmpty} from "class-validator";

export class CustomDto {
    readonly username: string;
    readonly type: string;
    readonly itemTitle : Date;
    readonly itemSubTitle: string;
    readonly description: string
}  
