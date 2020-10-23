import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsSchema } from './schemas/skills.schema';
import { AuthV2Module } from '../../../Authv2/authv2.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Skills', schema: SkillsSchema }]), 
  AuthV2Module, 
  SkillsModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}

