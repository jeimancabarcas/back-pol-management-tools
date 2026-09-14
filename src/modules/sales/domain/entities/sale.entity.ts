import { BaseEntity } from '../../../../core/domain/entity.base.js';

export interface SaleItemProps {
  id?: string;
  assetId: string;
  assetName: string;
  salePrice: number;
}

export class SaleItemEntity extends BaseEntity<string> {
  private _assetId: string;
  private _assetName: string;
  private _salePrice: number;

  constructor(props: SaleItemProps) {
    super(props.id ?? crypto.randomUUID());
    if (!props.assetId) {
      throw new Error('El ID del bien es obligatorio en el detalle de la venta.');
    }
    if (props.salePrice === undefined || props.salePrice === null || props.salePrice <= 0) {
      throw new Error(`El precio de venta para el bien "${props.assetName || props.assetId}" debe ser mayor a 0.`);
    }

    this._assetId = props.assetId;
    this._assetName = props.assetName;
    this._salePrice = props.salePrice;
  }

  get assetId(): string {
    return this._assetId;
  }

  get assetName(): string {
    return this._assetName;
  }

  get salePrice(): number {
    return this._salePrice;
  }
}

export interface SaleProps {
  id?: string;
  buyerName: string;
  buyerDocument: string;
  saleDate: Date;
  saleReason: string;
  items: SaleItemEntity[];
  totalAmount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class SaleEntity extends BaseEntity<string> {
  private _buyerName: string;
  private _buyerDocument: string;
  private _saleDate: Date;
  private _saleReason: string;
  private _items: SaleItemEntity[];
  private _totalAmount: number;

  private constructor(props: SaleProps) {
    super(props.id ?? crypto.randomUUID(), props.createdAt, props.updatedAt);
    this._buyerName = props.buyerName;
    this._buyerDocument = props.buyerDocument;
    this._saleDate = props.saleDate;
    this._saleReason = props.saleReason;
    this._items = props.items;
    this._totalAmount = props.totalAmount ?? this.calculateTotal(props.items);
  }

  public static create(props: Omit<SaleProps, 'totalAmount'>): SaleEntity {
    if (!props.buyerName || props.buyerName.trim().length === 0) {
      throw new Error('El nombre del comprador es obligatorio.');
    }
    if (!props.buyerDocument || props.buyerDocument.trim().length === 0) {
      throw new Error('El documento del comprador es obligatorio.');
    }
    if (!props.saleDate || isNaN(new Date(props.saleDate).getTime())) {
      throw new Error('La fecha de venta es obligatoria y debe ser válida.');
    }
    if (!props.saleReason || props.saleReason.trim().length === 0) {
      throw new Error('El motivo de venta es obligatorio.');
    }
    if (!props.items || props.items.length === 0) {
      throw new Error('La venta debe contener al menos un bien en el detalle.');
    }

    return new SaleEntity({
      ...props,
      buyerName: props.buyerName.trim(),
      buyerDocument: props.buyerDocument.trim(),
      saleReason: props.saleReason.trim(),
      saleDate: new Date(props.saleDate),
    });
  }

  public static restore(props: SaleProps): SaleEntity {
    return new SaleEntity(props);
  }

  private calculateTotal(items: SaleItemEntity[]): number {
    return items.reduce((acc, item) => acc + item.salePrice, 0);
  }

  get buyerName(): string {
    return this._buyerName;
  }

  get buyerDocument(): string {
    return this._buyerDocument;
  }

  get saleDate(): Date {
    return this._saleDate;
  }

  get saleReason(): string {
    return this._saleReason;
  }

  get items(): SaleItemEntity[] {
    return [...this._items];
  }

  get totalAmount(): number {
    return this._totalAmount;
  }
}
