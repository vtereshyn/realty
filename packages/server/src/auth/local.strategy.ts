import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { config } from '../config';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret
    });
  }

  async validate({ id: userId }: { id: string }): Promise<any> {
    const user = await this.authService.validateUser(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
