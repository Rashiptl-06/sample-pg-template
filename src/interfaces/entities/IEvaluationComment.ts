export interface CreateEvaluationCommentData {
  dealId: number;
  categoryId: number;
  parameterId: number;
  title: string;
  comment: string;
  createdBy: string;
}

export interface EvaluationCommentRow {
  id: number;
  dealId: number;
  categoryId: number;
  parameterId: number;
  title: string;
  comment: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}