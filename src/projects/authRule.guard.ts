import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../Auth/user.schema'
import * as admin from 'firebase-admin';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './interfaces/project.interface';
import { AuthV2Service } from '../Authv2/authv2.service';
import { Userv2 } from '../Authv2/userv2.schema';



@Injectable()
export class RulesGuard implements CanActivate {
    constructor(
      @InjectModel('Project') private readonly projectModel: Model<Project>,
      private readonly authV2Service: AuthV2Service
      ) {}
    

  canActivate( 
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    var authString = request.headers.authorization;
    var token = authString.split(" ")[1]
    
    var username = request.params.username;

    
    // console.log(this.projectModel.findOne({username: username}));
  
    // console.log(userModel);

    var user = this.validate(token);
    console.log(user);
    
    return false;
  }



  private async validate(jwtPayload: string): Promise<string> | null  {
    let result = null;
    
    await admin.auth()
      .verifyIdToken(jwtPayload)
      .then(async decodedToken => {
  
        
        const decoded = { uid: decodedToken.uid, email:decodedToken.email}
        console.log(decoded);

        result = await this.authV2Service.getUserFromDatabase(decoded);
        console.log(result);
        
        result = decodedToken.uid;
  
      })
      .catch(function(error) {
        console.log('Error creating custom token: ', error);
        throw new UnauthorizedException("Invalid Token")
      });
    
  
    return result     
  }
}





