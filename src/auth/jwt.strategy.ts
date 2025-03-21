import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultSecret',
    });
    console.log('JwtStrategy initialized with secret:', process.env.JWT_SECRET);
    console.log('Loaded JWT_SECRET:', process.env.JWT_SECRET);
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
