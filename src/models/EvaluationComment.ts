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
import EvaluationCategory from './EvaluationCategory';
import EvaluationParameter from './EvaluationParameter';

class EvaluationComment extends Model<
  InferAttributes<EvaluationComment>,
  InferCreationAttributes<EvaluationComment>
> {
  declare id: CreationOptional<number>;
  declare dealId: number;
  declare categoryId: number;
  declare parameterId: number;
  declare title: string;
  declare comment: string;
  declare createdBy: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

EvaluationComment.init(
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

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    parameterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    createdBy: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    tableName: tableNames.evaluationComments,
  },
);

EvaluationComment.belongsTo(Deal, {
  foreignKey: 'dealId',
  as: 'deal',
});

Deal.hasMany(EvaluationComment, {
  foreignKey: 'dealId',
  as: 'evaluationComments',
});

EvaluationComment.belongsTo(EvaluationCategory, {
  foreignKey: 'categoryId',
  as: 'category',
});

EvaluationCategory.hasMany(EvaluationComment, {
  foreignKey: 'categoryId',
  as: 'evaluationComments',
});

EvaluationComment.belongsTo(EvaluationParameter, {
  foreignKey: 'parameterId',
  as: 'parameter',
});

EvaluationParameter.hasMany(EvaluationComment, {
  foreignKey: 'parameterId',
  as: 'evaluationComments',
});

export default EvaluationComment;