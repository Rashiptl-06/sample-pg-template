export interface CreateAiProcessingJobData {
  dealId: number;
  frameworkId?: number | null;
  jobType:
    | 'PARAMETER_EVALUATION'
    | 'DILIGENCE_REPORT_GENERATION'
    | 'VIRTUAL_IC_MEMBER_REPORT_GENERATION'
    | 'BALANCED_REPORT_GENERATION';
  reason: string;
  requestedBy: string;
  reportVersionId?: number | null;
  retryOfJobId?: number | null;
}