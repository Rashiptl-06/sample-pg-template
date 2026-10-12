export interface ICreateDealRequest {
  sourceDealId: number;
  repositoryId: number;
  dealName: string;
  sectorId: number;
  geographyId: number;
  sponsorId?: number | null;
  dealTypeId: number;
  industryId: number;
  ndaConfirmed: boolean;
  stageId?: number | null;
}