import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schemas/project.schema';
import { AuthV2Module } from '../Authv2/authv2.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    AuthV2Module,
    MulterModule.register({
      dest: '/upload',
    })
  ],
  controllers: [ ProjectsController],
  providers: [ ProjectsService],
})
export class ProjectsModule {}
