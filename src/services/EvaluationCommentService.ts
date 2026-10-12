import {BaseService} from './BaseService';
import EvaluationCommentRepository from '../repositories/EvaluationCommentRepository';
import EvaluationParameter from '../models/EvaluationParameter';
import {
  DealParameterCommentsParams,
  UpsertEvaluationCommentBody,
} from '../interfaces/requests/IEvaluationComment';
import { Permission } from '../interfaces/Permission';
import { IUserToken } from '../interfaces/IUserToken';

export class EvaluationCommentService extends BaseService {
  private readonly evaluationCommentRepository: EvaluationCommentRepository;

  constructor() {
    super();

    this.evaluationCommentRepository =
      new EvaluationCommentRepository();
  }

  async listComments(
    params: DealParameterCommentsParams,
    byUser?: IUserToken,
  ) {
    await this.authorize(Permission.view, byUser);

    return this.evaluationCommentRepository.findByDealAndParameter(
      params.dealId,
      params.parameterId,
    );
  }

  async upsertComment(
    params: DealParameterCommentsParams,
    body: UpsertEvaluationCommentBody,
    byUser?: IUserToken,
  ) {
    const { dealId, parameterId } = params;
    const { commentId, title, comment } = body;

    if (commentId) {
      await this.authorize(Permission.edit, byUser);

      const existingComment =
        await this.evaluationCommentRepository.findById(commentId);

      if (!existingComment) {
        throw new Error('Evaluation comment not found');
      }

      if (
        existingComment.dealId !== dealId ||
        existingComment.parameterId !== parameterId
      ) {
        throw new Error(
          'Evaluation comment does not belong to this parameter',
        );
      }

      if (existingComment.createdBy !== byUser?.sub) {
        throw new Error(
          'You are not allowed to update this comment',
        );
      }

      const updatedComment =
        await this.evaluationCommentRepository.update(
          commentId,
          {
            title,
            comment,
          },
        );

      return {
        statusCode: 200,
        message: 'Evaluation comment updated successfully',
        data: updatedComment,
      };
    }

    await this.authorize(Permission.create, byUser);

    const parameter = await EvaluationParameter.findByPk(parameterId);

    if (!parameter) {
      throw new Error('Evaluation parameter not found');
    }

    const createdComment =
      await this.evaluationCommentRepository.create({
        dealId,
        categoryId: parameter.categoryId,
        parameterId,
        title,
        comment,
        createdBy: byUser?.sub ?? 'system',
      });

    return {
      statusCode: 201,
      message: 'Evaluation comment created successfully',
      data: createdComment,
    };
  }

  async deleteComment(
    params: {
      dealId: number;
      parameterId: number;
      commentId: number;
    },
    byUser?: IUserToken,
  ) {
    await this.authorize(Permission.delete, byUser);

    const existingComment =
      await this.evaluationCommentRepository.findById(
        params.commentId,
      );

    if (!existingComment) {
      throw new Error('Evaluation comment not found');
    }

    if (
      existingComment.dealId !== params.dealId ||
      existingComment.parameterId !== params.parameterId
    ) {
      throw new Error(
        'Evaluation comment does not belong to this parameter',
      );
    }

    if (existingComment.createdBy !== byUser?.sub) {
      throw new Error(
        'You are not allowed to delete this comment',
      );
    }

    await this.evaluationCommentRepository.destroy(
      params.commentId,
    );

    return {
      message: 'Evaluation comment deleted successfully',
    };
  }
}