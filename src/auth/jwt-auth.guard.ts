import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    console.log('Step 1 - JwtAuthGuard: request headers:', req.headers);
    const result = (await super.canActivate(context)) as boolean;
    console.log('Step 1 - JwtAuthGuard: result of super.canActivate:', result);
    return result;
  }
}
