import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module.js';
import { RegisterUseCase } from './application/use-cases/register.use-case.js';
import { LoginUseCase } from './application/use-cases/login.use-case.js';
import { GetProfileUseCase } from './application/use-cases/get-profile.use-case.js';
import { JwtStrategy } from './infrastructure/security/jwt.strategy.js';
import { JwtAuthGuard } from './infrastructure/security/jwt-auth.guard.js';
import { AuthController } from './infrastructure/http/controllers/auth.controller.js';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'super_secret_jwt_key_for_pol_management_2026'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '24h') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [RegisterUseCase, LoginUseCase, GetProfileUseCase, JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard, JwtModule, RegisterUseCase, LoginUseCase, GetProfileUseCase],
})
export class AuthModule {}
