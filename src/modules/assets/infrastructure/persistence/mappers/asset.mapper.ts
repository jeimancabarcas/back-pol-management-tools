import { AssetEntity } from '../../../domain/entities/asset.entity.js';
import { AssetOrmEntity } from '../entities/asset.orm-entity.js';

export class AssetMapper {
  public static toDomain(orm: AssetOrmEntity): AssetEntity {
    return AssetEntity.create({
      id: orm.id,
      name: orm.name,
      type: orm.type,
      acquisitionValue: orm.acquisitionValue,
      description: orm.description,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  public static toOrm(domain: AssetEntity): AssetOrmEntity {
    const orm = new AssetOrmEntity();
    orm.id = domain.id;
    orm.name = domain.name;
    orm.type = domain.type;
    orm.acquisitionValue = domain.acquisitionValue;
    orm.description = domain.description ?? null;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    return orm;
  }
}
