import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './schemas/project.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),AuthModule],
  controllers: [ ProjectsController],
  providers: [ ProjectsService],
})
export class ProjectsModule {}
