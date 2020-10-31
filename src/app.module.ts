import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { HealthcheckModule } from './Healthcheck/healthcheck.module';
import { MongooseConfig } from './Config/mongoose.config';
import { ProjectsModule } from './projects/projects.module';
import { AuthV2Module } from './Authv2/authv2.module';
import {PortfolioModule} from './portfolio/portfolio.module';
import { PublicModule } from './public/public.module';
// import { ProjectsModule } from './projects/projects.module';
import { VisibilityModule } from './visibility/visibility.module';

import { Profilev2Module } from './ProfileV2/profilev2.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(
      (process.env.NODE_ENV === "test")? process.env.TEST_MONGO: process.env.MONGO_URL, 
      MongooseConfig
    ),
    AuthV2Module,
    HealthcheckModule,
    ProjectsModule,
    PortfolioModule,
    PublicModule,
    VisibilityModule,
    Profilev2Module
  ],
})



export class AppModule {}
