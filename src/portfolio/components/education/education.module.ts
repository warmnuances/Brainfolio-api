import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EducationSchema } from './schemas/education.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Education', schema: EducationSchema }]), AuthModule, EducationModule],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}

