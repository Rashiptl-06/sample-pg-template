import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { PostgresDb } from '../db';
import { tableNames } from '../repositories/tableNames';
import SourceDeal from './SourceDeal';

class SourceDealFile extends Model<
  InferAttributes<SourceDealFile>,
  InferCreationAttributes<SourceDealFile>
> {
  declare id: CreationOptional<number>;
  declare sourceDealId: number;
  declare fileName: string;
  declare fileType: string;
  declare sourcePath: CreationOptional<string | null>;
  declare storagePath: string;
  declare sizeBytes: string;
  declare version: CreationOptional<number>;
  declare active: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SourceDealFile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sourceDealId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fileType: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sourcePath: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    storagePath: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    sizeBytes: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
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
    tableName: tableNames.sourceDealFiles,
  },
);

SourceDealFile.belongsTo(SourceDeal, {
  foreignKey: 'sourceDealId',
  as: 'sourceDeal',
});
SourceDeal.hasMany(SourceDealFile, {
  foreignKey: 'sourceDealId',
  as: 'files',
});

export default SourceDealFile;