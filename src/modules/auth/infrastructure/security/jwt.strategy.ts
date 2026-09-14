import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  USER_REPOSITORY_TOKEN,
  type IUserRepository,
} from '../../../users/domain/repositories/user.repository.interface.js';

export interface JwtPayload {
  sub: string;
  email: string;
  fullName: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super_secret_jwt_key_for_pol_management_2026',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userRepository.findById(payload.sub);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Token inválido o cuenta inactiva.');
    }

    return {
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      documentNumber: user.documentNumber,
      documentType: user.documentType,
    };
  }
}
