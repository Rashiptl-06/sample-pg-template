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

class AiProcessingJob extends Model<
  InferAttributes<AiProcessingJob>,
  InferCreationAttributes<AiProcessingJob>
> {
  declare id: CreationOptional<number>;
  declare dealId: number;
  declare frameworkId: CreationOptional<number | null>;
  declare jobType: string;
  declare reportVersionId: CreationOptional<number | null>;
  declare status: CreationOptional<string>;
  declare reason: string;
  declare retryOfJobId: CreationOptional<number | null>;
  declare errorMessage: CreationOptional<string | null>;
  declare requestedBy: string;
  declare requestedAt: CreationOptional<Date>;
  declare startedAt: CreationOptional<Date | null>;
  declare completedAt: CreationOptional<Date | null>;
  declare active: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

AiProcessingJob.init(
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
      allowNull: true,
    },

    jobType: {
      type: DataTypes.ENUM(
        'PARAMETER_EVALUATION',
        'DILIGENCE_REPORT_GENERATION',
        'VIRTUAL_IC_MEMBER_REPORT_GENERATION',
        'BALANCED_REPORT_GENERATION',
      ),
      allowNull: false,
    },

    reportVersionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        'Pending',
        'Ready',
        'Failed',
        'In Progress',
      ),
      allowNull: false,
      defaultValue: 'Pending',
    },

    reason: {
      type: DataTypes.ENUM(
        'INITIAL_PROCESSING',
        'NEW_FILE_CLASSIFIED',
        'FILE_UPDATED',
        'FILE_DELETED',
        'FRAMEWORK_CHANGED',
        'METADATA_CHANGED',
        'MANUAL_REPROCESS',
      ),
      allowNull: false,
    },

    retryOfJobId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    errorMessage: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    requestedBy: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    requestedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    startedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: tableNames.aiProcessingJobs,
  },
);

AiProcessingJob.belongsTo(Deal, {
  foreignKey: 'dealId',
  as: 'deal',
});

Deal.hasMany(AiProcessingJob, {
  foreignKey: 'dealId',
  as: 'aiProcessingJobs',
});

AiProcessingJob.belongsTo(EvaluationFramework, {
  foreignKey: 'frameworkId',
  as: 'framework',
});

EvaluationFramework.hasMany(AiProcessingJob, {
  foreignKey: 'frameworkId',
  as: 'aiProcessingJobs',
});

AiProcessingJob.belongsTo(AiProcessingJob, {
  foreignKey: 'retryOfJobId',
  as: 'retryOfJob',
});

AiProcessingJob.hasMany(AiProcessingJob, {
  foreignKey: 'retryOfJobId',
  as: 'retries',
});

export default AiProcessingJob;