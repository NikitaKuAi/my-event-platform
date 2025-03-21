import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtMiddleware } from './middleware/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Регистрируем кастомное middleware для всех запросов по пути /profile
  app.use('/profile', (req, res, next) => {
    const jwtMiddleware = new JwtMiddleware();
    jwtMiddleware.use(req, res, next);
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
