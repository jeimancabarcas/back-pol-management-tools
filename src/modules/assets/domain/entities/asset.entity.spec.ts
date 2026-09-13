import { describe, expect, it } from 'vitest';
import { AssetEntity } from './asset.entity.js';

describe('AssetEntity', () => {
  it('debe crear un bien válido con todos sus datos', () => {
    const asset = AssetEntity.create({
      name: 'Laptop Lenovo ThinkPad T14s Gen 4',
      type: 'Equipos de Cómputo',
      acquisitionValue: 1250.5,
      description: 'Intel i7, 32GB RAM, 1TB SSD',
    });

    expect(asset.id).toBeDefined();
    expect(asset.name).toBe('Laptop Lenovo ThinkPad T14s Gen 4');
    expect(asset.type).toBe('Equipos de Cómputo');
    expect(asset.acquisitionValue).toBe(1250.5);
    expect(asset.description).toBe('Intel i7, 32GB RAM, 1TB SSD');
    expect(asset.createdAt).toBeInstanceOf(Date);
  });

  it('debe lanzar error si el nombre del bien está vacío', () => {
    expect(() =>
      AssetEntity.create({
        name: '',
        type: 'Mobiliario',
        acquisitionValue: 100,
      }),
    ).toThrow('El nombre del bien es obligatorio.');
  });

  it('debe lanzar error si el nombre del bien supera los 120 caracteres', () => {
    expect(() =>
      AssetEntity.create({
        name: 'a'.repeat(121),
        type: 'Mobiliario',
        acquisitionValue: 100,
      }),
    ).toThrow('El nombre del bien no puede superar los 120 caracteres.');
  });

  it('debe lanzar error si el tipo de bien está vacío', () => {
    expect(() =>
      AssetEntity.create({
        name: 'Silla ergonómica',
        type: '',
        acquisitionValue: 100,
      }),
    ).toThrow('El tipo de bien es obligatorio.');
  });

  it('debe lanzar error si el valor de adquisición es menor o igual a 0', () => {
    expect(() =>
      AssetEntity.create({
        name: 'Silla ergonómica',
        type: 'Mobiliario',
        acquisitionValue: 0,
      }),
    ).toThrow('El valor de adquisición debe ser mayor a 0.');

    expect(() =>
      AssetEntity.create({
        name: 'Silla ergonómica',
        type: 'Mobiliario',
        acquisitionValue: -50,
      }),
    ).toThrow('El valor de adquisición debe ser mayor a 0.');
  });

  it('debe lanzar error si la descripción supera los 300 caracteres', () => {
    expect(() =>
      AssetEntity.create({
        name: 'Silla ergonómica',
        type: 'Mobiliario',
        acquisitionValue: 150,
        description: 'b'.repeat(301),
      }),
    ).toThrow('La descripción no puede superar los 300 caracteres.');
  });
});
