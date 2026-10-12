import { Op, WhereOptions } from 'sequelize';
import { ListDealAuditLogsParams } from '../interfaces/requests/IDealMaterialsRequest';

export function buildAuditLogsCreatedAtWhere(
  startDate?: string,
  endDate?: string,
): WhereOptions {
  if (!startDate && !endDate) {
    return {};
  }

  const createdAtFilter: { [Op.gte]?: Date; [Op.lte]?: Date } = {};

  if (startDate) {
    createdAtFilter[Op.gte] = new Date(startDate);
  }

  if (endDate) {
    const end = new Date(endDate);

    if (endDate.length <= 10) {
      end.setUTCHours(23, 59, 59, 999);
    }

    createdAtFilter[Op.lte] = end;
  }

  return { createdAt: createdAtFilter };
}

export function buildDealAuditLogsWhere(
  dealId: number,
  params: Pick<
    ListDealAuditLogsParams,
    'performedByIds' | 'actions' | 'startDate' | 'endDate'
  >,
): WhereOptions {
  const conditions: WhereOptions[] = [{ dealId }];

  if (params.performedByIds?.length) {
    conditions.push({
      performedBy: {
        [Op.in]: params.performedByIds,
      },
    });
  }

  if (params.actions?.length) {
    conditions.push({
      action: {
        [Op.in]: params.actions,
      },
    });
  }

  const createdAtWhere = buildAuditLogsCreatedAtWhere(
    params.startDate,
    params.endDate,
  );

  if (Object.keys(createdAtWhere).length > 0) {
    conditions.push(createdAtWhere);
  }

  return conditions.length === 1 ? conditions[0] : { [Op.and]: conditions };
}