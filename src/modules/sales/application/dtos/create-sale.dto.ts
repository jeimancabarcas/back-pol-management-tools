export interface CreateSaleItemInput {
  assetId: string;
  salePrice: number;
}

export interface CreateSaleInput {
  buyerName: string;
  buyerDocument: string;
  saleDate: Date | string;
  saleReason: string;
  items: CreateSaleItemInput[];
}
