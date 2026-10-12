export interface DealMaterialsListParams {
  dealId: number;
  search?: string;
  classificationId?: number;
  fileTypes?: string[];
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface DealMaterialSourceFile {
  id: number;
  fileName: string;
  fileType: string;
  sizeBytes: string;
  sourcePath: string | null;
  storagePath: string;
}

export interface DealMaterialClassification {
  id: number;
  name: string;
}

export interface DealMaterialRow {
  id: number;
  sourceFileId: number;
  sourceFileVersion: number;
  classificationId: number | null;
  updatedAt: Date;
  sourceFile?: DealMaterialSourceFile;
  classification?: DealMaterialClassification | null;
}

export interface DealMaterialsMeta {
  fileTypes: string[];
  lastUpdatedAt: Date | null;
}