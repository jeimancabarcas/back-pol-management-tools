import { describe, expect, it } from 'vitest';
import { SaleEntity, SaleItemEntity } from './sale.entity.js';

describe('SaleEntity & SaleItemEntity', () => {
  it('debe crear una venta válida con múltiples items y calcular el total correctamente', () => {
    const item1 = new SaleItemEntity({
      assetId: 'asset-uuid-1',
      assetName: 'Laptop Lenovo ThinkPad',
      salePrice: 1000.0,
    });
    const item2 = new SaleItemEntity({
      assetId: 'asset-uuid-2',
      assetName: 'Monitor Dell 27"',
      salePrice: 300.5,
    });

    const sale = SaleEntity.create({
      buyerName: 'Carlos Rodríguez',
      buyerDocument: 'CC 1098765432',
      saleDate: new Date('2026-09-14'),
      saleReason: 'Renovación de equipos',
      items: [item1, item2],
    });

    expect(sale.id).toBeDefined();
    expect(sale.buyerName).toBe('Carlos Rodríguez');
    expect(sale.buyerDocument).toBe('CC 1098765432');
    expect(sale.saleReason).toBe('Renovación de equipos');
    expect(sale.items).toHaveLength(2);
    expect(sale.totalAmount).toBe(1300.5);
  });

  it('debe lanzar error si el comprador está vacío', () => {
    const item = new SaleItemEntity({
      assetId: 'asset-uuid-1',
      assetName: 'Laptop',
      salePrice: 500,
    });

    expect(() =>
      SaleEntity.create({
        buyerName: '',
        buyerDocument: '12345',
        saleDate: new Date(),
        saleReason: 'Venta',
        items: [item],
      }),
    ).toThrow('El nombre del comprador es obligatorio.');
  });

  it('debe lanzar error si no tiene items', () => {
    expect(() =>
      SaleEntity.create({
        buyerName: 'Carlos',
        buyerDocument: '12345',
        saleDate: new Date(),
        saleReason: 'Venta',
        items: [],
      }),
    ).toThrow('La venta debe contener al menos un bien en el detalle.');
  });

  it('debe lanzar error si el precio de un item es menor o igual a 0', () => {
    expect(
      () =>
        new SaleItemEntity({
          assetId: 'asset-uuid-1',
          assetName: 'Laptop',
          salePrice: 0,
        }),
    ).toThrow('El precio de venta para el bien "Laptop" debe ser mayor a 0.');
  });
});
