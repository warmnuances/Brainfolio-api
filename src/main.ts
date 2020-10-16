import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Import firebase-admin
import * as admin from 'firebase-admin';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  admin.initializeApp({
    credential: admin.credential.cert(process.env.FIREBASE_APPLICATION_CREDENTIALS),
    storageBucket: "brainfolio-1faf6.appspot.com"
  });

  app.enableCors();


  //Swagger
  const options = new DocumentBuilder()
  .setTitle('API endpoints')
  .setDescription('Brainfolio API description')
  .setVersion('1.0')
  .addTag('Brainfolio')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT);
  console.log(`Listening on Port ${PORT}`);
}


bootstrap();

