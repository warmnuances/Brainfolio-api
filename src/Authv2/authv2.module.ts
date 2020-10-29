import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Profilev2, Profilev2Schema } from '../schema/profilev2.schema';
import { AuthV2Controller } from './authv2.controller';
import { AuthV2Service } from './authv2.service';
import { HTTPStrategy } from './passport/firebase-strategy';
import { Userv2, Userv2Schema } from '../schema/userv2.schema';
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer', session: false}),
    MongooseModule.forFeature([
      { name: Userv2.name, schema: Userv2Schema },
      { name: Profilev2.name, schema: Profilev2Schema }
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
