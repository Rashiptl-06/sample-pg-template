// import { Transaction } from 'sequelize';
import {BaseService} from './BaseService';
import EvaluationFrameworkRepository from '../repositories/EvaluationFrameworkRepository';
import { Permission } from '../interfaces/Permission';
import { IUserToken } from '../interfaces/IUserToken';
// import { NotFoundError } from '../exceptions/NotFoundError';

export class EvaluationFrameworkService extends BaseService {
  private readonly evaluationFrameworkRepository: EvaluationFrameworkRepository;

  constructor() {
    super();

    this.evaluationFrameworkRepository =
      new EvaluationFrameworkRepository();
  }

  async getFrameworkById(
    frameworkId: number,
    byUser?: IUserToken,
  ) {
    await this.authorize(Permission.view, byUser);

    return this.evaluationFrameworkRepository.getFrameworkById(frameworkId);
  }

  async getCategoriesByTaxonomy(
    sectorId: number,
    dealTypeId: number,
    industryId: number,
    byUser?: IUserToken,
  ) {
    await this.authorize(Permission.view, byUser);

    return this.evaluationFrameworkRepository.getFrameworkByTaxonomy(
      sectorId,
      dealTypeId,
      industryId,
    );
  }
}