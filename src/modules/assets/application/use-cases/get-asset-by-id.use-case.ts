import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUseCase } from '../../../../core/application/use-case.interface.js';
import {
  ASSET_REPOSITORY_TOKEN,
  type IAssetRepository,
} from '../../domain/repositories/asset.repository.interface.js';
import { AssetResponseDto, AssetResponseMapper } from '../dtos/asset-response.dto.js';

@Injectable()
export class GetAssetByIdUseCase implements IUseCase<string, AssetResponseDto> {
  constructor(
    @Inject(ASSET_REPOSITORY_TOKEN)
    private readonly assetRepository: IAssetRepository,
  ) {}

  async execute(id: string): Promise<AssetResponseDto> {
    const asset = await this.assetRepository.findById(id);
    if (!asset) {
      throw new NotFoundException(`El bien con ID "${id}" no fue encontrado.`);
    }
    return AssetResponseMapper.fromDomain(asset);
  }
}
