import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response,NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { AuthV2Service } from '../Authv2/authv2.service';
import { Userv2 } from '../schema/userv2.schema';


@Injectable()
export class UserReq implements NestMiddleware {
  constructor(
    private readonly authV2Service: AuthV2Service,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if(authorization){
      const token = authorization.split(" ")[1];
      const user = validate (token, this.authV2Service)
      if(user){
        req.user = user;
      }
      
    }

    next();
    


    async function validate(jwtPayload: string, authV2Service): Promise<Userv2> | null  {
      let result = null;
  
      try{
        const decodedToken = await admin.auth().verifyIdToken(jwtPayload)
        
        const decoded = { uid: decodedToken.uid, email:decodedToken.email}
        result =  await authV2Service.getUserFromDatabase(decoded);        
        return result;
  
      }
      catch(e){
        return null
      }
    }
  }
}
