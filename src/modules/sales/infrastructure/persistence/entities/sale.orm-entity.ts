import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn, type Relation } from 'typeorm';
import type { SaleItemOrmEntity } from './sale-item.orm-entity.js';

@Entity('sales')
export class SaleOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'buyer_name', type: 'varchar', length: 150, nullable: false })
  buyerName: string;

  @Column({ name: 'buyer_document', type: 'varchar', length: 50, nullable: false })
  buyerDocument: string;

  @Column({ name: 'sale_date', type: 'timestamp with time zone', nullable: false })
  saleDate: Date;

  @Column({ name: 'sale_reason', type: 'varchar', length: 300, nullable: false })
  saleReason: string;

  @Column({
    name: 'total_amount',
    type: 'decimal',
    precision: 14,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => (typeof value === 'string' ? parseFloat(value) : value),
    },
  })
  totalAmount: number;

  @OneToMany('SaleItemOrmEntity', 'sale', { cascade: true, eager: true })
  items: Relation<SaleItemOrmEntity>[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
