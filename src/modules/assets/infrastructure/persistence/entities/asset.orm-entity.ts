import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('assets')
export class AssetOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 120, nullable: false })
  name: string;

  @Column({ name: 'type', type: 'varchar', length: 100, nullable: false })
  type: string;

  @Column({
    name: 'acquisition_value',
    type: 'decimal',
    precision: 12,
    scale: 2,
    nullable: false,
    transformer: {
      to: (value: number) => value,
      from: (value: string | number) => (typeof value === 'string' ? parseFloat(value) : value),
    },
  })
  acquisitionValue: number;

  @Column({ name: 'description', type: 'varchar', length: 300, nullable: true })
  description: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
