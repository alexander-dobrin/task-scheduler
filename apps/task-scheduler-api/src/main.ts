import { NestFactory } from '@nestjs/core';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { createClient } from 'redis';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const redisClient = createClient({
    url: 'redis://redis:6379',
  });
  await redisClient.connect();
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'app:',
  });

  app.use(
    session({
      store: redisStore,
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
    }),
  );
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
