import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Берем секрет из переменной окружения, обрезая лишние пробелы
    const secret = (process.env.JWT_SECRET || 'defaultSecret').trim();
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
    console.log('JwtStrategy initialized with secret:', secret);
  }

  async validate(payload: any) {
    console.log('JwtStrategy.validate() called with payload:', payload);
    return { userId: payload.sub, email: payload.email };
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.log('Error in JwtStrategy.handleRequest:', err, info);
      throw err || new UnauthorizedException(info ? info.message : 'Unauthorized');
    }
    console.log('JwtStrategy.handleRequest returns user:', user);
    return user;
  }
}
