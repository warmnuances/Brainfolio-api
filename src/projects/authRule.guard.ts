import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../Auth/user.schema'
import * as admin from 'firebase-admin';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './interfaces/project.interface';
import { Userv2 } from 'src/Authv2/userv2.schema';

@Injectable()
export class RulesGuard implements CanActivate {
    constructor(@InjectModel('Project') private readonly projectModel: Model<Project>) {}
    

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    var token = request.headers.authorization;
    var username = request.params.username;


    console.log(token);
    
    
    console.log(this.projectModel.findOne({username: username}));
  


    // console.log(userModel);

    var user = validate(token);
    console.log(user);
    
    return false;
  }
}


async function validate(jwtPayload: string): Promise<Userv2> | null  {
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

// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }
