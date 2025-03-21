import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Нет заголовка авторизации');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Неверный формат заголовка авторизации');
    }

    const token = parts[1];

    try {
      // Используем секрет из process.env или жестко заданное значение для проверки
      const secret = (process.env.JWT_SECRET || 'YourJWTSecretKey123').trim();
      const decoded = jwt.verify(token, secret);
      console.log('Custom Middleware: Токен декодирован успешно:', decoded);
      // Можно сохранить декодированные данные в req.user для дальнейшего использования
      req['user'] = decoded;
      next();
    } catch (error) {
      console.error('Custom Middleware: Ошибка проверки токена:', error);
      throw new UnauthorizedException('Токен недействителен');
    }
  }
}
