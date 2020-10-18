import { IsNotEmpty } from "class-validator";

export class DeleteFilesDto {

    @IsNotEmpty()
    readonly _id: string;

    readonly projectFileName: string[];    

}  