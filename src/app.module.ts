import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/auth.module';
import { HealthcheckModule } from './Healthcheck/healthcheck.module';
import {MongooseConfig} from './Config/mongoose.config';
// import { ProjectsModule } from './projects/projects.module';

//TODO: (Optional) Create ConfigServiceto deserialise vars
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(
      process.env.TEST_MONGO, 
      MongooseConfig
    ),
    AuthModule,
    HealthcheckModule,
    // ProjectsModule,
  ]
})



export class AppModule {}
