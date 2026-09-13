import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min } from 'class-validator';

export class CreateAssetRequestDto {
  @IsString({ message: 'El nombre del bien debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre del bien es obligatorio.' })
  @MaxLength(120, { message: 'El nombre del bien no puede superar los 120 caracteres.' })
  name: string;

  @IsString({ message: 'El tipo de bien debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El tipo de bien es obligatorio.' })
  type: string;

  @IsNumber({}, { message: 'El valor de adquisición debe ser un número válido.' })
  @IsPositive({ message: 'El valor de adquisición debe ser mayor a 0.' })
  @Min(0.01, { message: 'El valor de adquisición debe ser mayor a 0.' })
  acquisitionValue: number;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @MaxLength(300, { message: 'La descripción no puede superar los 300 caracteres.' })
  description?: string;
}
