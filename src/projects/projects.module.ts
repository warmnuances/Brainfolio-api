import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schemas/project.schema';
import { AuthV2Module } from '../Authv2/authv2.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthV2Service } from 'src/Authv2/authv2.service';
import { Userv2, Userv2Schema } from '../Authv2/userv2.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    AuthV2Module
  ],
  controllers: [ ProjectsController],
  providers: [ ProjectsService],
})
export class ProjectsModule {}
