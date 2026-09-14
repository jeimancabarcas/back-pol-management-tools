import { UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { describe, expect, it, vi } from 'vitest';
import { LoginUseCase } from './login.use-case.js';
import { UserEntity } from '../../../users/domain/entities/user.entity.js';
import type { IUserRepository } from '../../../users/domain/repositories/user.repository.interface.js';

describe('LoginUseCase', () => {
  it('debe autenticar exitosamente y retornar token con credenciales correctas', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = UserEntity.create({
      email: 'carlos@empresa.com',
      password: hashedPassword,
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      documentNumber: '1098765432',
      documentType: 'CC',
    });

    const mockUserRepo: IUserRepository = {
      findById: vi.fn(),
      findByEmail: vi.fn().mockResolvedValue(user),
      findByDocument: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    };

    const mockJwtService: any = {
      signAsync: vi.fn().mockResolvedValue('jwt-mock-login-token'),
    };

    const useCase = new LoginUseCase(mockUserRepo, mockJwtService);

    const result = await useCase.execute({
      email: 'carlos@empresa.com',
      password: 'password123',
    });

    expect(result.accessToken).toBe('jwt-mock-login-token');
    expect(result.tokenType).toBe('Bearer');
    expect(result.user.email).toBe('carlos@empresa.com');
  });

  it('debe lanzar UnauthorizedException si la contraseña no coincide', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = UserEntity.create({
      email: 'carlos@empresa.com',
      password: hashedPassword,
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      documentNumber: '1098765432',
      documentType: 'CC',
    });

    const mockUserRepo: IUserRepository = {
      findById: vi.fn(),
      findByEmail: vi.fn().mockResolvedValue(user),
      findByDocument: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    };

    const mockJwtService: any = {
      signAsync: vi.fn(),
    };

    const useCase = new LoginUseCase(mockUserRepo, mockJwtService);

    await expect(
      useCase.execute({
        email: 'carlos@empresa.com',
        password: 'wrongpassword',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('debe lanzar UnauthorizedException si el usuario no existe', async () => {
    const mockUserRepo: IUserRepository = {
      findById: vi.fn(),
      findByEmail: vi.fn().mockResolvedValue(null),
      findByDocument: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    };

    const mockJwtService: any = {
      signAsync: vi.fn(),
    };

    const useCase = new LoginUseCase(mockUserRepo, mockJwtService);

    await expect(
      useCase.execute({
        email: 'inexistente@empresa.com',
        password: 'password123',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
