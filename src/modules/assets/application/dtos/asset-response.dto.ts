import { AssetEntity } from '../../domain/entities/asset.entity.js';

export interface AssetResponseDto {
  id: string;
  name: string;
  type: string;
  acquisitionValue: number;
  description: string | null;
  createdAt: Date;
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
