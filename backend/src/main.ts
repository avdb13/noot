import { TypeormStore } from 'connect-typeorm';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { DataSource } from 'typeorm';
import { Session } from './auth/session.entity';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const repository = app.get(DataSource).getRepository(Session);

  app.use(
    session({
      secret: 'ssshhh',
      store: new TypeormStore({
        cleanupLimit: 2,
        ttl: 3.6e6,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: process.env.NODE_ENV === 'development' ? false : true,
          maxAge: 3.6e6,
        },
      }).connect(repository),
    }),
  );
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
