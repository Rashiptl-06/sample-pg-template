import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { PostgresDb } from '../db';
import { tableNames } from '../repositories/tableNames';
import EvaluationCategory from './EvaluationCategory';

class EvaluationFramework extends Model<
  InferAttributes<EvaluationFramework>,
  InferCreationAttributes<EvaluationFramework>
> {
  declare id: CreationOptional<number>;
  declare sectorId: number;
  declare dealTypeId: number;
  declare industryId: number;
  declare description: CreationOptional<string | null>;
  declare createdBy: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

EvaluationFramework.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sectorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dealTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    industryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    schema: 'public',
    tableName: tableNames.evaluationFrameworks,
  },
);

EvaluationFramework.hasMany(EvaluationCategory, {
  foreignKey: 'frameworkId',
  as: 'categories',
});

EvaluationCategory.belongsTo(EvaluationFramework, {
  foreignKey: 'frameworkId',
  as: 'framework',
});

export default EvaluationFramework;