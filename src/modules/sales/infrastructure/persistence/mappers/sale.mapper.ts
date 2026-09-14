import { SaleEntity, SaleItemEntity } from '../../../domain/entities/sale.entity.js';
import { SaleOrmEntity } from '../entities/sale.orm-entity.js';
import { SaleItemOrmEntity } from '../entities/sale-item.orm-entity.js';

export class SaleMapper {
  public static itemToDomain(orm: SaleItemOrmEntity): SaleItemEntity {
    return new SaleItemEntity({
      id: orm.id,
      assetId: orm.assetId,
      assetName: orm.assetName,
      salePrice: orm.salePrice,
    });
  }

  public static itemToOrm(domain: SaleItemEntity, saleId: string): SaleItemOrmEntity {
    const orm = new SaleItemOrmEntity();
    orm.id = domain.id;
    orm.saleId = saleId;
    orm.assetId = domain.assetId;
    orm.assetName = domain.assetName;
    orm.salePrice = domain.salePrice;
    return orm;
  }

  public static toDomain(orm: SaleOrmEntity): SaleEntity {
    const items = (orm.items || []).map(SaleMapper.itemToDomain);
    return SaleEntity.restore({
      id: orm.id,
      buyerName: orm.buyerName,
      buyerDocument: orm.buyerDocument,
      saleDate: orm.saleDate,
      saleReason: orm.saleReason,
      totalAmount: orm.totalAmount,
      items,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  public static toOrm(domain: SaleEntity): SaleOrmEntity {
    const orm = new SaleOrmEntity();
    orm.id = domain.id;
    orm.buyerName = domain.buyerName;
    orm.buyerDocument = domain.buyerDocument;
    orm.saleDate = domain.saleDate;
    orm.saleReason = domain.saleReason;
    orm.totalAmount = domain.totalAmount;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.items = domain.items.map((item) => SaleMapper.itemToOrm(item, domain.id));
    return orm;
  }
}
