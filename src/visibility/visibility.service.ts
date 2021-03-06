import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sendEmail } from '../utils/sendEmail';
import { createTokenDto } from './dto/create-token.dto';
// import { Visibility } from './interface/visibility.interface';
import { Visibility } from '../schema/visibility.schema';
@Injectable()
export class VisibilityService {

    constructor(@InjectModel('Visibility') private readonly visibilityModel: Model<Visibility>) {}

    async getUserList( username:string): Promise<Visibility[]>{
        try{
            return this.visibilityModel.find({username:username}).exec();
        }catch(e){
            throw new HttpException('MongoError', HttpStatus.CONFLICT)
        }
    }

    async deleteToken( username:string, token:string,): Promise<Visibility>{
        const visibilityModel = await this.visibilityModel.findOneAndRemove({username:username, token:token});
        if(visibilityModel){
            return visibilityModel
        }else{
            throw new HttpException('Invalid request', HttpStatus.NOT_FOUND)
        }
        
    }
    async createToken(fromName:string, username:string, body:createTokenDto): Promise<Visibility>{
        
        //Creating new token schema
        const tokenModel = new this.visibilityModel(body)
        tokenModel.username = username;
        tokenModel.token = tokenModel._id;

        //Const for email data
        const sendName = tokenModel.name
        const toEmail = tokenModel.email
        const link = process.env.FRONTEND_HOST + 'app/portfolio/' + username + '?token=' + tokenModel.token 

        //send email
        await sendEmail(fromName, sendName, toEmail, link)

        await tokenModel.save()

        return tokenModel
    }



}
