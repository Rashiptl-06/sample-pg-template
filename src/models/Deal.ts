import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { PostgresDb } from '../db';
import { tableNames } from '../repositories/tableNames';
import DealStage from './DealStage';

class Deal extends Model<
  InferAttributes<Deal>,
  InferCreationAttributes<Deal>
> {
  declare id: CreationOptional<number>;
  declare sourceDealId: number;
  declare repositoryId: number;
  declare dealName: string;
  declare sectorId: number;
  declare geographyId: number;
  declare sponsorId: number | null;
  declare dealTypeId: number;
  declare industryId: number;
  declare stageId: CreationOptional<number | null>;
  declare status: CreationOptional<string>;
  declare ndaConfirmed: CreationOptional<boolean>;
  declare aiOutputConfirmedBy: CreationOptional<string | null>;
  declare aiOutputConfirmedAt: CreationOptional<Date | null>;
  declare stageChangedBy: CreationOptional<string | null>;
  declare stageChangedAt: CreationOptional<Date | null>;
  declare completedAt: CreationOptional<Date | null>;
  // declare createdBy: string;
  declare createdBy: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Deal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sourceDealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    repositoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dealName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    sectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    geographyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sponsorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dealTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    industryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(
        'Draft',
        'Active',
        'On Hold',
        'Completed',
        'Cancelled',
        'Archived',
      ),
      allowNull: false,
      defaultValue: 'Draft',
    },
    ndaConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    aiOutputConfirmedBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    aiOutputConfirmedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    stageChangedBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    stageChangedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'system',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: PostgresDb.sequelize,
    timestamps: true,
    underscored: true,
    tableName: tableNames.deals,
  },
);

Deal.belongsTo(DealStage, {
  foreignKey: 'stageId',
  as: 'stage',
});

DealStage.hasMany(Deal, {
  foreignKey: 'stageId',
  as: 'deals',
});

export default Deal;