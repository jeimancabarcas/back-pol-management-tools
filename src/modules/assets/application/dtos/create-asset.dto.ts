export interface CreateAssetInput {
  name: string;
  type: string;
  acquisitionValue: number;
  description?: string | null;
}
