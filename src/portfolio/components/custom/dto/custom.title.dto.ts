import { IsNotEmpty} from "class-validator";

export class CustomTitleDto {
    readonly username: string;
  
    readonly type: string;
  
    readonly sectionTitle : string;
}  
