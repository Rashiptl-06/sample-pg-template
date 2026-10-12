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
import EvaluationFramework from './EvaluationFramework';
import EvaluationCategory from './EvaluationCategory';
import EvaluationParameter from './EvaluationParameter';

class AiDealParameterResult extends Model<
  InferAttributes<AiDealParameterResult>,
  InferCreationAttributes<AiDealParameterResult>
> {
  declare id: CreationOptional<number>;
  declare dealId: number;
  declare frameworkId: number;
  declare categoryId: number;
  declare parameterId: number;
  declare confidenceLevel: 'High' | 'Moderate' | 'Low';
  declare confidenceScore: number;
  declare aiValue: CreationOptional<Record<string, unknown> | null>;
  declare aiSummary: CreationOptional<string | null>;
  declare citationsCount: CreationOptional<number>;
  declare active: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

AiDealParameterResult.init(
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

    frameworkId: {
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

    confidenceLevel: {
      type: DataTypes.ENUM('High', 'Moderate', 'Low'),
      allowNull: false,
    },

    confidenceScore: {
      type: DataTypes.DECIMAL(4, 3),
      allowNull: false,
    },

    aiValue: {
      type: DataTypes.JSONB,
      allowNull: true,
    },

    aiSummary: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    citationsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    tableName: tableNames.aiDealParameterResults,
  },
);

AiDealParameterResult.belongsTo(Deal, {
  foreignKey: 'dealId',
  as: 'deal',
});

Deal.hasMany(AiDealParameterResult, {
  foreignKey: 'dealId',
  as: 'aiDealParameterResults',
});

AiDealParameterResult.belongsTo(EvaluationFramework, {
  foreignKey: 'frameworkId',
  as: 'framework',
});

EvaluationFramework.hasMany(AiDealParameterResult, {
  foreignKey: 'frameworkId',
  as: 'aiDealParameterResults',
});

AiDealParameterResult.belongsTo(EvaluationCategory, {
  foreignKey: 'categoryId',
  as: 'category',
});

EvaluationCategory.hasMany(AiDealParameterResult, {
  foreignKey: 'categoryId',
  as: 'aiDealParameterResults',
});

AiDealParameterResult.belongsTo(EvaluationParameter, {
  foreignKey: 'parameterId',
  as: 'parameter',
});

EvaluationParameter.hasMany(AiDealParameterResult, {
  foreignKey: 'parameterId',
  as: 'aiDealParameterResults',
});

export default AiDealParameterResult;