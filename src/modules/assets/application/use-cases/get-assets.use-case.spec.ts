import { describe, expect, it, vi } from 'vitest';
import { GetAssetsUseCase } from './get-assets.use-case.js';
import { AssetEntity } from '../../domain/entities/asset.entity.js';
import type { IAssetRepository } from '../../domain/repositories/asset.repository.interface.js';

describe('GetAssetsUseCase', () => {
  it('debe listar todos los bienes consultados', async () => {
    const asset1 = AssetEntity.create({
      name: 'Laptop Lenovo ThinkPad T14s Gen 4',
      type: 'Equipos de Cómputo',
      acquisitionValue: 1500,
    });
    const asset2 = AssetEntity.create({
      name: 'Escritorio de Madera',
      type: 'Mobiliario',
      acquisitionValue: 300,
    });

    const mockRepo: IAssetRepository = {
      findById: vi.fn(),
      findAll: vi.fn().mockResolvedValue([asset1, asset2]),
      findByName: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    };

    const useCase = new GetAssetsUseCase(mockRepo);
    const result = await useCase.execute();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Laptop Lenovo ThinkPad T14s Gen 4');
    expect(result[1].name).toBe('Escritorio de Madera');
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });
});
