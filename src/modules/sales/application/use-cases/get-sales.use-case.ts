import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../core/application/use-case.interface.js';
import {
  SALE_REPOSITORY_TOKEN,
  type ISaleRepository,
} from '../../domain/repositories/sale.repository.interface.js';
import { SaleResponseDto, SaleResponseMapper } from '../dtos/sale-response.dto.js';

@Injectable()
export class GetSalesUseCase implements IUseCase<void, SaleResponseDto[]> {
  constructor(
    @Inject(SALE_REPOSITORY_TOKEN)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(): Promise<SaleResponseDto[]> {
    const sales = await this.saleRepository.findAll();
    return sales.map(SaleResponseMapper.fromDomain);
  }
}
