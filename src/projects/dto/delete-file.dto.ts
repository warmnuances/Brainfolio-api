import { IsNotEmpty } from "class-validator";

export class DeleteFilesDto {

    @IsNotEmpty()
    readonly projectId: string;

    readonly projectFileName: string[];    

}  