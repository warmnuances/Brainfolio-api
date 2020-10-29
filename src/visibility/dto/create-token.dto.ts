import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsArray, IsBoolean } from "class-validator";

export class createTokenDto {

    @ApiProperty()
    @IsNotEmpty()
    readonly type: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly email: string;

}  