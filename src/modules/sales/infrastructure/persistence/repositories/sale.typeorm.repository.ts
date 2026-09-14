import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AssetOrmEntity } from '../../../../assets/infrastructure/persistence/entities/asset.orm-entity.js';
import { SaleEntity } from '../../../domain/entities/sale.entity.js';
import { ISaleRepository } from '../../../domain/repositories/sale.repository.interface.js';
import { SaleOrmEntity } from '../entities/sale.orm-entity.js';
import { SaleMapper } from '../mappers/sale.mapper.js';

@Injectable()
export class SaleTypeOrmRepository implements ISaleRepository {
  constructor(
    @InjectRepository(SaleOrmEntity)
    private readonly saleRepository: Repository<SaleOrmEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async findById(id: string): Promise<SaleEntity | null> {
    const found = await this.saleRepository.findOne({
      where: { id },
      relations: { items: true },
    });
    return found ? SaleMapper.toDomain(found) : null;
  }

  async findAll(): Promise<SaleEntity[]> {
    const list = await this.saleRepository.find({
      relations: { items: true },
      order: { createdAt: 'DESC' },
    });
    return list.map(SaleMapper.toDomain);
  }

  async save(entity: SaleEntity): Promise<SaleEntity> {
    const orm = SaleMapper.toOrm(entity);
    const saved = await this.saleRepository.save(orm);
    return SaleMapper.toDomain(saved);
  }

  async saveSaleAndRemoveAssets(sale: SaleEntity, assetIds: string[]): Promise<SaleEntity> {
    return await this.dataSource.transaction(async (manager) => {
      // 1. Guardar la venta y sus items con cascade
      const orm = SaleMapper.toOrm(sale);
      const savedSaleOrm = await manager.save(SaleOrmEntity, orm);

      // 2. Eliminar los bienes del inventario activo
      if (assetIds.length > 0) {
        await manager.delete(AssetOrmEntity, assetIds);
      }

      return SaleMapper.toDomain(savedSaleOrm);
    });
  }

  async delete(id: string): Promise<void> {
    await this.saleRepository.delete(id);
  }
}
