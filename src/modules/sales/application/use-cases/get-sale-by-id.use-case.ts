import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../../core/application/use-case.interface.js';
import {
  SALE_REPOSITORY_TOKEN,
  type ISaleRepository,
} from '../../domain/repositories/sale.repository.interface.js';
import { SaleResponseDto, SaleResponseMapper } from '../dtos/sale-response.dto.js';

@Injectable()
export class GetSaleByIdUseCase implements IUseCase<string, SaleResponseDto> {
  constructor(
    @Inject(SALE_REPOSITORY_TOKEN)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(id: string): Promise<SaleResponseDto> {
    const sale = await this.saleRepository.findById(id);
    if (!sale) {
      throw new NotFoundException(`La venta con ID "${id}" no fue encontrada.`);
    }
    return SaleResponseMapper.fromDomain(sale);
  }
}
