export interface DashboardSummaryProps {
  inventoryAssetsCount: number;
  inventoryAccumulatedValue: number;
  soldAssetsCount: number;
  salesRevenue: number;
}

export class DashboardSummaryEntity {
  private readonly _inventoryAssetsCount: number;
  private readonly _inventoryAccumulatedValue: number;
  private readonly _soldAssetsCount: number;
  private readonly _salesRevenue: number;

  constructor(props: DashboardSummaryProps) {
    this._inventoryAssetsCount = Number(props.inventoryAssetsCount) || 0;
    this._inventoryAccumulatedValue = Number(props.inventoryAccumulatedValue) || 0;
    this._soldAssetsCount = Number(props.soldAssetsCount) || 0;
    this._salesRevenue = Number(props.salesRevenue) || 0;
  }

  get inventoryAssetsCount(): number {
    return this._inventoryAssetsCount;
  }

  get inventoryAccumulatedValue(): number {
    return this._inventoryAccumulatedValue;
  }

  get soldAssetsCount(): number {
    return this._soldAssetsCount;
  }

  get salesRevenue(): number {
    return this._salesRevenue;
  }
}
