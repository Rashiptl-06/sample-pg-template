export interface IListDealsParams {
  search?: string;
  sectorIds?: number[];
  geographyIds?: number[];
  industryIds?: number[];
  dealTypeIds?: number[];
  stageIds?: number[];
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}