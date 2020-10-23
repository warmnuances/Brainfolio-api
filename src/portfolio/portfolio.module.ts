import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioSchema } from './schemas/portfolio.schema';
import { AuthV2Module } from '../Authv2/authv2.module';
import { EducationModule } from './components/education/education.module';
import { ExperienceModule } from './components/experience/experience.module';
import { ProfileModule } from './components/profile/profile.module';
import { SkillsModule } from './components/skills/skills.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Portfolio', schema: PortfolioSchema }]), 
    AuthV2Module, 
    EducationModule, 
    ExperienceModule, 
    ProfileModule, 
    SkillsModule
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {

}
