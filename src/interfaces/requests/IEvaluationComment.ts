export interface DealParameterCommentsParams {
  dealId: number;
  parameterId: number;
}

export interface DealParameterCommentParams
  extends DealParameterCommentsParams {
  commentId: number;
}

export interface UpsertEvaluationCommentBody {
  commentId?: number | null;
  title: string;
  comment: string;
}