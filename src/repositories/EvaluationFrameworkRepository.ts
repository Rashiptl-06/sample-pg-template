import { Transaction } from 'sequelize';

import EvaluationFramework from '../models/EvaluationFramework';
import EvaluationCategory from '../models/EvaluationCategory';
import EvaluationParameter from '../models/EvaluationParameter';

export default class EvaluationFrameworkRepository {
    async findActiveByTaxonomy(
        sectorId: number,
        dealTypeId: number,
        industryId: number,
        transaction?: Transaction,
    ): Promise<{ id: number } | null> {
        const framework = await EvaluationFramework.findOne({
            where: { sectorId, dealTypeId, industryId },
            attributes: ['id'],
            transaction,
        });

        return framework ? { id: framework.id } : null;
    }
    async getFrameworkById(
        frameworkId: number,
        transaction?: Transaction,
    ): Promise<EvaluationFramework | null> {
        return EvaluationFramework.findOne({
            where: {
                id: frameworkId,
            },
            include: [
                {
                    model: EvaluationCategory,
                    as: 'categories',
                    include: [
                        {
                            model: EvaluationParameter,
                            as: 'parameters',
                        },
                    ],
                },
            ],
            order: [
                [
                    {
                        model: EvaluationCategory,
                        as: 'categories',
                    },
                    'displayOrder',
                    'ASC',
                ],
                [
                    {
                        model: EvaluationCategory,
                        as: 'categories',
                    },
                    {
                        model: EvaluationParameter,
                        as: 'parameters',
                    },
                    'id',
                    'ASC',
                ],
            ],
            transaction,
        });
    }

    async getFrameworkByTaxonomy(
        sectorId: number,
        dealTypeId: number,
        industryId: number,
        transaction?: Transaction,
    ): Promise<EvaluationFramework | null> {
        return EvaluationFramework.findOne({
            where: {
                sectorId,
                dealTypeId,
                industryId,
            },
            include: [
                {
                    model: EvaluationCategory,
                    as: 'categories',
                    include: [
                        {
                            model: EvaluationParameter,
                            as: 'parameters',
                        },
                    ],
                },
            ],
            order: [
                [
                    {
                        model: EvaluationCategory,
                        as: 'categories',
                    },
                    'displayOrder',
                    'ASC',
                ],
                [
                    {
                        model: EvaluationCategory,
                        as: 'categories',
                    },
                    {
                        model: EvaluationParameter,
                        as: 'parameters',
                    },
                    'id',
                    'ASC',
                ],
            ],
            transaction,
        });
    }


}

