import { BaseEntity } from '../../../../core/domain/entity.base.js';

export interface AssetProps {
  id?: string;
  name: string;
  type: string;
  acquisitionValue: number;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AssetEntity extends BaseEntity<string> {
  private _name: string;
  private _type: string;
  private _acquisitionValue: number;
  private _description?: string | null;

  private constructor(props: AssetProps) {
    super(props.id ?? crypto.randomUUID(), props.createdAt, props.updatedAt);
    this._name = props.name;
    this._type = props.type;
    this._acquisitionValue = props.acquisitionValue;
    this._description = props.description ?? null;
  }

  public static create(props: AssetProps): AssetEntity {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error('El nombre del bien es obligatorio.');
    }
    if (props.name.length > 120) {
      throw new Error('El nombre del bien no puede superar los 120 caracteres.');
    }
    if (!props.type || props.type.trim().length === 0) {
      throw new Error('El tipo de bien es obligatorio.');
    }
    if (props.acquisitionValue === undefined || props.acquisitionValue === null || props.acquisitionValue <= 0) {
      throw new Error('El valor de adquisición debe ser mayor a 0.');
    }
    if (props.description && props.description.length > 300) {
      throw new Error('La descripción no puede superar los 300 caracteres.');
    }

    return new AssetEntity({
      ...props,
      name: props.name.trim(),
      type: props.type.trim(),
      description: props.description ? props.description.trim() : null,
    });
  }

  get name(): string {
    return this._name;
  }

  get type(): string {
    return this._type;
  }

  get acquisitionValue(): number {
    return this._acquisitionValue;
  }

  get description(): string | null | undefined {
    return this._description;
  }
}
