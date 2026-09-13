import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min } from 'class-validator';

export class CreateAssetRequestDto {
  @ApiProperty({
    description: 'Nombre o modelo específico del bien',
    example: 'Laptop Lenovo ThinkPad T14s Gen 4',
    maxLength: 120,
  })
  @IsString({ message: 'El nombre del bien debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del bien es obligatorio.' })
  @MaxLength(120, { message: 'El nombre del bien no puede superar los 120 caracteres.' })
  name: string;

  @ApiProperty({
    description: 'Clasificación contable y funcional del bien',
    example: 'Equipos de Cómputo',
  })
  @IsString({ message: 'El tipo de bien debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El tipo de bien es obligatorio.' })
  type: string;

  @ApiProperty({
    description: 'Valor monetario de adquisición en USD (mayor a 0)',
    example: 1250.0,
    minimum: 0.01,
  })
  @IsNumber({}, { message: 'El valor de adquisición debe ser un número válido.' })
  @IsPositive({ message: 'El valor de adquisición debe ser mayor a 0.' })
  @Min(0.01, { message: 'El valor de adquisición debe ser mayor a 0.' })
  acquisitionValue: number;

  @ApiPropertyOptional({
    description: 'Descripción técnica, accesorios incluidos o notas de recepción',
    example: 'Intel i7 13va Gen, 32GB RAM, 1TB SSD NVMe. Incluye cargador tipo C.',
    maxLength: 300,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @MaxLength(300, { message: 'La descripción no puede superar los 300 caracteres.' })
  description?: string;
}

