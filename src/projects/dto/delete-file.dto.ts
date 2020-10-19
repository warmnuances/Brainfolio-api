import { IsNotEmpty } from "class-validator";

export class DeleteFilesDto {

    readonly _id: string;

    readonly projectFileName: string[];    

}  