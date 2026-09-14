import { BadRequestException, NotFoundException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { CreateSaleUseCase } from './create-sale.use-case.js';
import { AssetEntity } from '../../../assets/domain/entities/asset.entity.js';
import { SaleEntity } from '../../domain/entities/sale.entity.js';
import type { IAssetRepository } from '../../../assets/domain/repositories/asset.repository.interface.js';
import type { ISaleRepository } from '../../domain/repositories/sale.repository.interface.js';

describe('CreateSaleUseCase', () => {
  it('debe registrar la venta con múltiples bienes y retirarlos del inventario', async () => {
    const asset1 = AssetEntity.create({
      id: 'asset-1',
      name: 'Laptop Lenovo',
      type: 'Equipos de Cómputo',
      acquisitionValue: 1200,
    });
    const asset2 = AssetEntity.create({
      id: 'asset-2',
      name: 'Monitor LG',
      type: 'Equipos de Cómputo',
      acquisitionValue: 300,
    });

    const mockAssetRepo: IAssetRepository = {
      findById: vi.fn().mockImplementation(async (id: string) => {
        if (id === 'asset-1') return asset1;
        if (id === 'asset-2') return asset2;
        return null;
      }),
      findAll: vi.fn(),
      findByName: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    };

    const mockSaleRepo: ISaleRepository = {
      findById: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
      saveSaleAndRemoveAssets: vi.fn().mockImplementation(async (sale: SaleEntity) => sale),
    };

    const useCase = new CreateSaleUseCase(mockSaleRepo, mockAssetRepo);

    const result = await useCase.execute({
      buyerName: 'Carlos Rodríguez',
      buyerDocument: '1098765432',
      saleDate: '2026-09-14',
      saleReason: 'Renovación de flota tecnológica',
      items: [
        { assetId: 'asset-1', salePrice: 900 },
        { assetId: 'asset-2', salePrice: 200 },
      ],
    });

    expect(result.id).toBeDefined();
    expect(result.buyerName).toBe('Carlos Rodríguez');
    expect(result.items).toHaveLength(2);
    expect(result.totalAmount).toBe(1100);
    expect(mockAssetRepo.findById).toHaveBeenCalledTimes(2);
    expect(mockSaleRepo.saveSaleAndRemoveAssets).toHaveBeenCalledWith(
      expect.anything(),
      ['asset-1', 'asset-2'],
    );
  });

  it('debe lanzar NotFoundException si un bien no existe en el inventario', async () => {
    const mockAssetRepo: IAssetRepository = {
      findById: vi.fn().mockResolvedValue(null),
      findAll: vi.fn(),
      findByName: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    };

    const mockSaleRepo: ISaleRepository = {
      findById: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
      saveSaleAndRemoveAssets: vi.fn(),
    };

    const useCase = new CreateSaleUseCase(mockSaleRepo, mockAssetRepo);

    await expect(
      useCase.execute({
        buyerName: 'Carlos Rodríguez',
        buyerDocument: '1098765432',
        saleDate: '2026-09-14',
        saleReason: 'Venta',
        items: [{ assetId: 'asset-inexistente', salePrice: 500 }],
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('debe lanzar BadRequestException si se intenta enviar el mismo bien dos veces en la misma venta', async () => {
    const mockAssetRepo: IAssetRepository = {
      findById: vi.fn(),
      findAll: vi.fn(),
      findByName: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
    };

    const mockSaleRepo: ISaleRepository = {
      findById: vi.fn(),
      findAll: vi.fn(),
      save: vi.fn(),
      delete: vi.fn(),
      saveSaleAndRemoveAssets: vi.fn(),
    };

    const useCase = new CreateSaleUseCase(mockSaleRepo, mockAssetRepo);

    await expect(
      useCase.execute({
        buyerName: 'Carlos Rodríguez',
        buyerDocument: '1098765432',
        saleDate: '2026-09-14',
        saleReason: 'Venta',
        items: [
          { assetId: 'asset-1', salePrice: 500 },
          { assetId: 'asset-1', salePrice: 500 },
        ],
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
