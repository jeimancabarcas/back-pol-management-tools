import { IRepository } from '../../../../core/domain/repository.interface.js';
import { SaleEntity } from '../entities/sale.entity.js';

export const SALE_REPOSITORY_TOKEN = Symbol('SALE_REPOSITORY_TOKEN');

export interface ISaleRepository extends IRepository<SaleEntity, string> {
  saveSaleAndRemoveAssets(sale: SaleEntity, assetIds: string[]): Promise<SaleEntity>;
}
