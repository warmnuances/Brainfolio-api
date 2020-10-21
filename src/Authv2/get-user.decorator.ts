import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Userv2 } from "./userv2.schema";


export const GetUser = createParamDecorator(async (data, ctx: ExecutionContext): Promise<Userv2> => {
    const req = ctx.switchToHttp().getRequest();

    return req.user    
});