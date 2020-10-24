import { Module } from '@nestjs/common';
import { CustomController } from './custom.controller';
import { CustomService } from './custom.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomSchema } from './schemas/custom.schema';
import { CustomTitleSchema } from './schemas/custom.title.schema';
import { AuthV2Module } from '../../../Authv2/authv2.module';

@Module({ 
    imports: [
        MongooseModule.forFeature([{ name: 'Custom', schema: CustomSchema },{ name: 'CustomTitle', schema: CustomTitleSchema }]), AuthV2Module, CustomModule],
    controllers: [CustomController],
    providers: [CustomService]
})

export class CustomModule {}

// @Module({
//     imports: [MongooseModule.forFeature([{ name: 'Education', schema: EducationSchema }]), AuthV2Module, EducationModule],
//     controllers: [EducationController],
//     providers: [EducationService],
//   })
//   export class EducationModule {}
  
