import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsSchema } from './schemas/skills.schema';
import { AuthModule } from '../../../auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Skills', schema: SkillsSchema }]), 
  AuthModule, 
  SkillsModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}

