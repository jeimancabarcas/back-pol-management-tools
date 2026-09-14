import { ConflictException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { RegisterUseCase } from './register.use-case.js';
import { UserEntity } from '../../../users/domain/entities/user.entity.js';
import type { IUserRepository } from '../../../users/domain/repositories/user.repository.interface.js';

describe('RegisterUseCase', () => {
  it('debe registrar un nuevo usuario exitosamente y generar token', async () => {
    const mockUserRepo: IUserRepository = {
      findById: vi.fn(),
      findByEmail: vi.fn().mockResolvedValue(null),
      findByDocument: vi.fn().mockResolvedValue(null),
      findAll: vi.fn(),
      save: vi.fn().mockImplementation(async (u: UserEntity) => u),
      delete: vi.fn(),
    };

    const mockJwtService: any = {
      signAsync: vi.fn().mockResolvedValue('jwt-mock-token-xyz'),
    };

    const useCase = new RegisterUseCase(mockUserRepo, mockJwtService);

    const result = await useCase.execute({
      email: 'carlos@empresa.com',
      password: 'password123',
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      documentNumber: '1098765432',
      documentType: 'CC',
    });

    expect(result.accessToken).toBe('jwt-mock-token-xyz');
    expect(result.tokenType).toBe('Bearer');
    expect(result.user.email).toBe('carlos@empresa.com');
    expect(result.user.firstName).toBe('Carlos');
    expect(mockUserRepo.save).toHaveBeenCalledTimes(1);
  });

  it('debe lanzar ConflictException si el email ya existe', async () => {
    const existingUser = UserEntity.create({
      email: 'carlos@empresa.com',
      password: 'hashedpassword',
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      documentNumber: '1098765432',
      documentType: 'CC',
    });

    const mockUserRepo: IUserRepository = {
      findById: vi.fn(),
      findByEmail: vi.fn().mockResolvedValue(existingUser),
      findByDocument: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    };

    const mockJwtService: any = {
      signAsync: vi.fn(),
    };

    const useCase = new RegisterUseCase(mockUserRepo, mockJwtService);

    await expect(
      useCase.execute({
        email: 'carlos@empresa.com',
        password: 'password123',
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        documentNumber: '1098765432',
        documentType: 'CC',
      }),
    ).rejects.toThrow(ConflictException);
  });
});
