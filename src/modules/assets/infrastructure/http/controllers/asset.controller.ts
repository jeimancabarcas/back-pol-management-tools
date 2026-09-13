import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateAssetUseCase } from '../../../application/use-cases/create-asset.use-case.js';
import { GetAssetsUseCase } from '../../../application/use-cases/get-assets.use-case.js';
import { GetAssetByIdUseCase } from '../../../application/use-cases/get-asset-by-id.use-case.js';
import { CreateAssetRequestDto } from '../dtos/create-asset-request.dto.js';
import type { AssetResponseDto } from '../../../application/dtos/asset-response.dto.js';


@Controller('assets')
export class AssetController {
  constructor(
    private readonly createAssetUseCase: CreateAssetUseCase,
    private readonly getAssetsUseCase: GetAssetsUseCase,
    private readonly getAssetByIdUseCase: GetAssetByIdUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAssetDto: CreateAssetRequestDto): Promise<AssetResponseDto> {
    return this.createAssetUseCase.execute({
      name: createAssetDto.name,
      type: createAssetDto.type,
      acquisitionValue: createAssetDto.acquisitionValue,
      description: createAssetDto.description,
    });
  }

  @Get()
  async findAll(): Promise<AssetResponseDto[]> {
    return this.getAssetsUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<AssetResponseDto> {
    return this.getAssetByIdUseCase.execute(id);
  }
}
