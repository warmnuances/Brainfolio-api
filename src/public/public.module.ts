import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from '../projects/schemas/project.schema';
import { EducationSchema } from '../portfolio/components/education/schemas/education.schema';
import { ExperienceSchema } from '../portfolio/components/experience/schemas/experience.schema';
import { ProfileSchema } from '../portfolio/components/profile/schemas/profile.schema';
import { SkillsSchema } from '../portfolio/components/skills/schemas/skills.schema';
import { AuthV2Module } from '../Authv2/authv2.module';
import { Userv2, Userv2Schema } from '../Authv2/userv2.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Project', schema: ProjectSchema },
      { name: 'Education', schema: EducationSchema },
      { name: 'Experience', schema: ExperienceSchema },
      { name: 'Profile', schema: ProfileSchema },
      { name: 'Skills', schema: SkillsSchema },
      { name: Userv2.name, schema: Userv2Schema }
    ]),
    
  ],
  providers: [PublicService],
  controllers: [PublicController]
})
export class PublicModule {}
