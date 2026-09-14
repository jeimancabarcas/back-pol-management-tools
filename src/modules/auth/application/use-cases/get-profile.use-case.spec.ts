import { NotFoundException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { GetProfileUseCase } from './get-profile.use-case.js';
import { UserEntity } from '../../../users/domain/entities/user.entity.js';
import type { IUserRepository } from '../../../users/domain/repositories/user.repository.interface.js';

describe('GetProfileUseCase', () => {
  it('debe retornar el perfil del usuario autenticado', async () => {
    const user = UserEntity.create({
      id: 'user-uuid-1',
      email: 'carlos@empresa.com',
      password: 'hashedpassword',
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      documentNumber: '1098765432',
      documentType: 'CC',
    });

    const mockUserRepo: IUserRepository = {
      findById: vi.fn().mockResolvedValue(user),
      findByEmail: vi.fn(),
      findByDocument: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    };

    const useCase = new GetProfileUseCase(mockUserRepo);
    const result = await useCase.execute('user-uuid-1');

    expect(result.id).toBe('user-uuid-1');
    expect(result.email).toBe('carlos@empresa.com');
    expect(result.fullName).toBe('Carlos Rodríguez');
    expect(mockUserRepo.findById).toHaveBeenCalledWith('user-uuid-1');
  });

  it('debe lanzar NotFoundException si el usuario no existe', async () => {
    const mockUserRepo: IUserRepository = {
      findById: vi.fn().mockResolvedValue(null),
      findByEmail: vi.fn(),
      findByDocument: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    };

    const useCase = new GetProfileUseCase(mockUserRepo);

    await expect(useCase.execute('non-existent-id')).rejects.toThrow(NotFoundException);
  });
});
