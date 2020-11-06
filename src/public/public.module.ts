import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from '../projects/schemas/project.schema';
import { EducationSchema } from '../portfolio/components/education/schemas/education.schema';
import { ExperienceSchema } from '../portfolio/components/experience/schemas/experience.schema';
import { ProfileSchema } from '../portfolio/components/profile/schemas/profile.schema';
import { SkillsSchema } from '../portfolio/components/skills/schemas/skills.schema';
import { AuthV2Module } from '../Authv2/authv2.module';
import { Userv2, Userv2Schema } from '../schema/userv2.schema';
import { VisibilitySchema } from '../schema/visibility.schema';
import { UserReq } from './userReq.middleware';
import { AuthV2Service } from '../Authv2/authv2.service';
import { Profilev2, Profilev2Schema } from '../schema/profilev2.schema';
import { CustomSchema } from '../portfolio/components/custom/schemas/custom.schema';
import { CustomTitleSchema } from '../portfolio/components/custom/schemas/custom.title.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Project', schema: ProjectSchema },
      { name: 'Education', schema: EducationSchema },
      { name: 'Experience', schema: ExperienceSchema },
      { name: 'Profile', schema: ProfileSchema },
      { name: 'Skills', schema: SkillsSchema },
      { name: 'Visibility', schema: VisibilitySchema },
      { name: Userv2.name, schema: Userv2Schema },
      { name: Profilev2.name, schema: Profilev2Schema },
      { name: 'Custom', schema: CustomSchema },
      { name: 'CustomTitle', schema: CustomTitleSchema },
      
    ]),
    
  ],
  providers: [PublicService, AuthV2Service],
  controllers: [PublicController]
})
export class PublicModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserReq)
      .forRoutes(PublicController)
  }
}