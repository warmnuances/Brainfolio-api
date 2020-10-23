import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './schemas/profile.schema';
import { AuthV2Module } from '../../../Authv2/authv2.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]), 
  AuthV2Module, 
  ProfileModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}

