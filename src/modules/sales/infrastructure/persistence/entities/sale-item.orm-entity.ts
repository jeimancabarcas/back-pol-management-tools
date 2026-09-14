import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, type Relation } from 'typeorm';
import type { SaleOrmEntity } from './sale.orm-entity.js';

@Entity('sale_items')
export class SaleItemOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'sale_id', type: 'uuid' })
  saleId: string;

  @Column({ name: 'asset_id', type: 'uuid', nullable: false })
  assetId: string;

  @Column({ name: 'asset_name', type: 'varchar', length: 150, nullable: false })
  assetName: string;

  @Column({
    name: 'sale_price',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => (typeof value === 'string' ? parseFloat(value) : value),
    },
  })
  salePrice: number;

  @ManyToOne('SaleOrmEntity', 'items', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale: Relation<SaleOrmEntity>;
}
