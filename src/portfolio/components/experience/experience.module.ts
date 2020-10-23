import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExperienceSchema } from './schemas/experience.schema';
import { AuthV2Module } from '../../../Authv2/authv2.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Experience', schema: ExperienceSchema }]), 
  AuthV2Module, 
  ExperienceModule],
  controllers: [ExperienceController],
  providers: [ExperienceService],
})
export class ExperienceModule {}

