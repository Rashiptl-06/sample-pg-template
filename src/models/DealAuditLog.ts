import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { PostgresDb } from '../db';
import { tableNames } from '../repositories/tableNames';
import Deal from './Deal';

class DealAuditLog extends Model<
  InferAttributes<DealAuditLog>,
  InferCreationAttributes<DealAuditLog>
> {
  declare id: CreationOptional<number>;
  declare dealId: number;
  declare entityType: string;
  declare entityId: CreationOptional<number | null>;
  declare action: string;
  declare performedBy: string;
  declare summary: string;
  declare details: CreationOptional<Record<string, unknown> | null>;
  declare createdAt: CreationOptional<Date>;
}

DealAuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    dealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entityType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    performedBy: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    details: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: PostgresDb.sequelize,
    timestamps: true,
    updatedAt: false,
    underscored: true,
    schema: 'public',
    tableName: tableNames.dealAuditLogs,
  },
);

DealAuditLog.belongsTo(Deal, {
  foreignKey: 'dealId',
  as: 'deal',
});

Deal.hasMany(DealAuditLog, {
  foreignKey: 'dealId',
  as: 'auditLogs',
});

export default DealAuditLog;