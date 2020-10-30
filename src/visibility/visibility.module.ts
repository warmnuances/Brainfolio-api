import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthV2Module } from 'src/Authv2/authv2.module';
import { VisibilityController } from './visibility.controller';
import { VisibilitySchema } from '../schema/visibility.schema';
import { VisibilityService } from './visibility.service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Visibility', schema: VisibilitySchema }]),
    AuthV2Module
  ],
  controllers: [VisibilityController],
  providers: [VisibilityService]
})
export class VisibilityModule {}
