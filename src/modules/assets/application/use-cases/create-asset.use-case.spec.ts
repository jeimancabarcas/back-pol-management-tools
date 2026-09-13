import { describe, expect, it, vi } from 'vitest';
import { CreateAssetUseCase } from './create-asset.use-case.js';
import { AssetEntity } from '../../domain/entities/asset.entity.js';
import type { IAssetRepository } from '../../domain/repositories/asset.repository.interface.js';

describe('CreateAssetUseCase', () => {
  it('debe registrar un nuevo bien exitosamente', async () => {
    const mockRepo: IAssetRepository = {
      findById: vi.fn(),
      findAll: vi.fn(),
      findByName: vi.fn(),
      save: vi.fn().mockImplementation(async (entity: AssetEntity) => entity),
      delete: vi.fn(),
    };

    const useCase = new CreateAssetUseCase(mockRepo);

    const result = await useCase.execute({
      name: 'Laptop Lenovo ThinkPad T14s Gen 4',
      type: 'Equipos de Cómputo',
      acquisitionValue: 1500,
      description: 'Equipo para desarrollo',
    });

    expect(result.id).toBeDefined();
    expect(result.name).toBe('Laptop Lenovo ThinkPad T14s Gen 4');
    expect(result.type).toBe('Equipos de Cómputo');
    expect(result.acquisitionValue).toBe(1500);
    expect(result.description).toBe('Equipo para desarrollo');
    expect(mockRepo.save).toHaveBeenCalledTimes(1);
  });
});
