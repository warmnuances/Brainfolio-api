import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy } from 'passport-http-bearer';
import { AuthV2Service } from '../authv2.service';
import { Userv2 } from '../userv2.schema';
import * as admin from 'firebase-admin';


@Injectable()
export class HTTPStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly authV2Service: AuthV2Service,
  ) {
    super();
  }

  async validate(jwtPayload: string): Promise<Userv2> | null  {
    let result = null;
    
    await admin.auth()
      .verifyIdToken(jwtPayload)
      .then(decodedToken => {

        const decoded = { uid: decodedToken.uid, email:decodedToken.email}
        result =  this.authV2Service.getUserFromDatabase(decoded);

      })
      .catch(function(error) {
        console.log('Error creating custom token: ', error);
        throw new UnauthorizedException("Invalid Token")
      });
    

    return result     
  }

}