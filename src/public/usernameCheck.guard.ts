import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Userv2 } from '../schema/userv2.schema';




@Injectable()
export class UsernameCheck implements CanActivate {
    constructor(
        @InjectModel('Userv2') private readonly userModel: Model<Userv2>,
    ) {}
    
    private async findUsername(username){

            const result = await this.userModel.findOne({username:username}).exec();
            return await result;

        
    }
    canActivate( 
    context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {

        // const request = context.switchToHttp().getRequest();
        // const username = request.params.username;
        // var result;

        

        // try{
        //     this.findUsername(username).then( response =>{       
        //         console.log('response', response);
        //         if (response){
        //             console.log('true');
        //             result = true
        //             return true;
        //         } else {
        //             console.log('false');
        //             result = false;
        //             return false;
        //         }
        //     })
      
        // } catch(e){
        //     throw new UnauthorizedException("(Passport Valdidate) Invalid Token: " + e)
        // }
        return false;
    }
}

