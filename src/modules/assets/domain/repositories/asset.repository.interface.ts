import { IRepository } from '../../../../core/domain/repository.interface.js';
import { AssetEntity } from '../entities/asset.entity.js';

export const ASSET_REPOSITORY_TOKEN = Symbol('ASSET_REPOSITORY_TOKEN');

export interface IAssetRepository extends IRepository<AssetEntity, string> {
  // Métodos específicos adicionales si se requieren a futuro
  findByName(name: string): Promise<AssetEntity[]>;
}
