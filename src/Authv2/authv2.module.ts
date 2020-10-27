import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Profile,ProfileSchema } from '../portfolio/components/profile/schemas/profile.schema';
import { AuthV2Controller } from './authv2.controller';
import { AuthV2Service } from './authv2.service';
import { HTTPStrategy } from './passport/firebase-strategy';
import { Userv2, Userv2Schema } from './userv2.schema';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer', session: false}),
    MongooseModule.forFeature([
      { name: Userv2.name, schema: Userv2Schema },
      { name: Profile.name, schema: ProfileSchema }
    ])
  ],
  controllers: [AuthV2Controller],
  providers: [
    AuthV2Service, 
    HTTPStrategy
  ],
  exports:[
    HTTPStrategy,
    PassportModule
  ]
})
export class AuthV2Module {}
