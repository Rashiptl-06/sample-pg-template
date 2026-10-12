export interface DealMaterialsParams {
  dealId: number;
}

export interface DealMaterialsQuery {
  search?: string;
  classificationId?: number;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface DealMaterialsBody {
  fileTypes: string[];
}

export interface DealAuditLogsQuery {
  page: number;
  limit: number;
}

export interface DealAuditLogsBody {
  performedByIds?: string[];
  actions?: string[];
  startDate?: string;
  endDate?: string;
}

export type ListDealAuditLogsParams = DealAuditLogsQuery & DealAuditLogsBody;

export interface ListDealAuditLogsFilterAggregation {
  performedByIds: string[];
  actions: string[];
}