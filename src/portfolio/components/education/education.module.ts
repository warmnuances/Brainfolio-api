import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationSchema } from './schemas/education.schema';
import { AuthV2Module } from '../../../Authv2/authv2.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Education', schema: EducationSchema }]), AuthV2Module, EducationModule],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}

