import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetEntity } from '../../../domain/entities/asset.entity.js';
import { IAssetRepository } from '../../../domain/repositories/asset.repository.interface.js';
import { AssetOrmEntity } from '../entities/asset.orm-entity.js';
import { AssetMapper } from '../mappers/asset.mapper.js';

@Injectable()
export class AssetTypeOrmRepository implements IAssetRepository {
  constructor(
    @InjectRepository(AssetOrmEntity)
    private readonly repository: Repository<AssetOrmEntity>,
  ) {}

  async findById(id: string): Promise<AssetEntity | null> {
    const found = await this.repository.findOne({ where: { id } });
    return found ? AssetMapper.toDomain(found) : null;
  }

  async findAll(): Promise<AssetEntity[]> {
    const list = await this.repository.find({
      order: { createdAt: 'DESC' },
    });
    return list.map(AssetMapper.toDomain);
  }

  async findByName(name: string): Promise<AssetEntity[]> {
    const list = await this.repository.find({
      where: { name },
      order: { createdAt: 'DESC' },
    });
    return list.map(AssetMapper.toDomain);
  }

  async save(entity: AssetEntity): Promise<AssetEntity> {
    const orm = AssetMapper.toOrm(entity);
    const saved = await this.repository.save(orm);
    return AssetMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
