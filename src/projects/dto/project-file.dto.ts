import { IsNotEmpty } from "class-validator";

export class FileDto {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;


}  