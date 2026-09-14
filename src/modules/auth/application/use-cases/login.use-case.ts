import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { IUseCase } from '../../../../core/application/use-case.interface.js';
import {
  USER_REPOSITORY_TOKEN,
  type IUserRepository,
} from '../../../users/domain/repositories/user.repository.interface.js';
import { LoginInput } from '../dtos/login.dto.js';
import { AuthResponseDto, UserProfileMapper } from '../dtos/auth-response.dto.js';

@Injectable()
export class LoginUseCase implements IUseCase<LoginInput, AuthResponseDto> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(input: LoginInput): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas. Verifique su correo o contraseña.');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('La cuenta de usuario se encuentra inactiva o deshabilitada.');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas. Verifique su correo o contraseña.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      user: UserProfileMapper.fromDomain(user),
    };
  }
}
