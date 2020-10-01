import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Import firebase-admin
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const adminConfig: ServiceAccount = require("../firebaseconfig.json")

  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    storageBucket: "brainfolio-1faf6.appspot.com"
  });

  app.enableCors();

  await app.listen(PORT);
  console.log(`Listening on Port ${PORT}`);
}


bootstrap();
