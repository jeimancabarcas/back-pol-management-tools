import { ApiProperty } from '@nestjs/swagger';
import { AssetEntity } from '../../domain/entities/asset.entity.js';

export class AssetResponseDto {
  @ApiProperty({
    description: 'Identificador único UUID del bien',
    example: 'd9b2d63d-a233-4123-8478-f0923055f2d6',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre o modelo específico del bien',
    example: 'Laptop Lenovo ThinkPad T14s Gen 4',
  })
  name: string;

  @ApiProperty({
    description: 'Clasificación contable y funcional del bien',
    example: 'Equipos de Cómputo',
  })
  type: string;

  @ApiProperty({
    description: 'Valor monetario de adquisición en USD',
    example: 1250.0,
  })
  acquisitionValue: number;

  @ApiProperty({
    description: 'Descripción detallada o especificaciones',
    example: 'Intel i7, 32GB RAM, 1TB SSD',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Fecha de registro en el sistema',
    example: '2026-09-13T19:55:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Fecha de última actualización',
    example: '2026-09-13T19:55:00.000Z',
  })
  updatedAt: Date;
}

export class AssetResponseMapper {
  public static fromDomain(entity: AssetEntity): AssetResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type,
      acquisitionValue: entity.acquisitionValue,
      description: entity.description ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

