import { Module } from '@nestjs/common';
import { Profilev2Controller } from './profilev2.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthV2Module } from '../Authv2/authv2.module';
import { Profilev2, Profilev2Schema } from '../schema/profilev2.schema';
import { Profilev2Service } from './profilev2.service';
import { Userv2,Userv2Schema } from '../schema/userv2.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profilev2.name, schema: Profilev2Schema },
      { name: Userv2.name, schema: Userv2Schema }
    ]), 
    AuthV2Module
  ],
  controllers: [Profilev2Controller],
  providers: [Profilev2Service],
})
export class Profilev2Module {}

