import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { PostgresDb } from '../db';
import { tableNames } from '../repositories/tableNames';

class EvaluationParameter extends Model<
  InferAttributes<EvaluationParameter>,
  InferCreationAttributes<EvaluationParameter>
> {
  declare id: CreationOptional<number>;
  declare categoryId: number;
  declare parameterName: string;
  declare description: CreationOptional<string | null>;
  declare createdBy: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

EvaluationParameter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parameterName: {
      type: DataTypes.STRING(255),
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
    tableName: tableNames.evaluationParameters,
  },
);

export default EvaluationParameter;