import { Transaction } from 'sequelize';

import EvaluationComment from '../models/EvaluationComment';
import {
  CreateEvaluationCommentData,
  EvaluationCommentRow,
} from '../interfaces/entities/IEvaluationComment';

export default class EvaluationCommentRepository {
  async findByDealAndParameter(
    dealId: number,
    parameterId: number,
    transaction?: Transaction,
  ): Promise<EvaluationCommentRow[]> {
    return EvaluationComment.findAll({
      where: {
        dealId,
        parameterId,
      },
      order: [['createdAt', 'DESC']],
      transaction,
      raw: true,
    }) as unknown as Promise<EvaluationCommentRow[]>;
  }

  async findById(
    commentId: number,
    transaction?: Transaction,
  ): Promise<EvaluationCommentRow | null> {
    return EvaluationComment.findOne({
      where: {
        id: commentId,
      },
      transaction,
      raw: true,
    }) as unknown as Promise<EvaluationCommentRow | null>;
  }

  async create(
    data: CreateEvaluationCommentData,
    transaction?: Transaction,
  ): Promise<EvaluationCommentRow> {
    const created = await EvaluationComment.create(data, {
      transaction,
    });

    return created.get({ plain: true }) as EvaluationCommentRow;
  }

  async update(
    commentId: number,
    data: {
      title: string;
      comment: string;
    },
    transaction?: Transaction,
  ): Promise<EvaluationCommentRow | null> {
    await EvaluationComment.update(data, {
      where: {
        id: commentId,
      },
      transaction,
    });

    return this.findById(commentId, transaction);
  }

  async destroy(
    commentId: number,
    transaction?: Transaction,
  ): Promise<number> {
    return EvaluationComment.destroy({
      where: {
        id: commentId,
      },
      transaction,
    });
  }
}