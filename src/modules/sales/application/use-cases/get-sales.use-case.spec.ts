import { describe, expect, it, vi } from 'vitest';
import { GetSalesUseCase } from './get-sales.use-case.js';
import { SaleEntity, SaleItemEntity } from '../../domain/entities/sale.entity.js';
import type { ISaleRepository } from '../../domain/repositories/sale.repository.interface.js';

describe('GetSalesUseCase', () => {
  it('debe listar todas las ventas con su detalle', async () => {
    const sale1 = SaleEntity.create({
      buyerName: 'Carlos Rodríguez',
      buyerDocument: '1098765432',
      saleDate: new Date('2026-09-14'),
      saleReason: 'Renovación',
      items: [
        new SaleItemEntity({
          assetId: 'asset-1',
          assetName: 'Laptop Lenovo',
          salePrice: 900,
        }),
      ],
    });

    const mockSaleRepo: ISaleRepository = {
      findById: vi.fn(),
      findAll: vi.fn().mockResolvedValue([sale1]),
      save: vi.fn(),
      delete: vi.fn(),
      saveSaleAndRemoveAssets: vi.fn(),
    };

    const useCase = new GetSalesUseCase(mockSaleRepo);
    const result = await useCase.execute();

    expect(result).toHaveLength(1);
    expect(result[0].buyerName).toBe('Carlos Rodríguez');
    expect(result[0].items).toHaveLength(1);
    expect(result[0].totalAmount).toBe(900);
    expect(mockSaleRepo.findAll).toHaveBeenCalledTimes(1);
  });
});
