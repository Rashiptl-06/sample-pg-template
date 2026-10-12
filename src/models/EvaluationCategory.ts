import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';

import { PostgresDb } from '../db';
import { tableNames } from '../repositories/tableNames';
import EvaluationParameter from './EvaluationParameter';

class EvaluationCategory extends Model<
  InferAttributes<EvaluationCategory>,
  InferCreationAttributes<EvaluationCategory>
> {
  declare id: CreationOptional<number>;
  declare frameworkId: number;
  declare categoryName: string;
  declare displayOrder: number;
  declare createdBy: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

EvaluationCategory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    frameworkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: tableNames.evaluationCategories,
  },
);

EvaluationCategory.hasMany(EvaluationParameter, {
  foreignKey: 'categoryId',
  as: 'parameters',
});

EvaluationParameter.belongsTo(EvaluationCategory, {
  foreignKey: 'categoryId',
  as: 'category',
});

export default EvaluationCategory;