import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import * as jwt from 'jsonwebtoken';

@Controller('profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req) {
    console.log('ProfileController: req.user:', req.user);
    return { message: 'Доступ разрешён', user: req.user };
  }

  // Новый тестовый маршрут для проверки токена
  @Get('test-verify')
  testVerify(@Request() req) {
    // Извлекаем токен из заголовка Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return { error: 'Нет заголовка Authorization' };
    }
    const token = authHeader.split(' ')[1];
    try {
      // Используем jwt.verify для проверки токена с вашим секретом
      const decoded = jwt.verify(token, 'YourJWTSecretKey123');
      console.log('TestVerify: Токен успешно проверен:', decoded);
      return { message: 'Токен валиден', decoded };
    } catch (error) {
      console.log('TestVerify: Ошибка проверки токена:', error);
      return { error: 'Токен недействителен', details: error.message };
    }
  }
}
