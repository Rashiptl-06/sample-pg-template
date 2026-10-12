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
import SourceDealFile from './SourceDealFile';
import FileClassification from './FileClassification';

class DealFile extends Model<
  InferAttributes<DealFile>,
  InferCreationAttributes<DealFile>
> {
  declare id: CreationOptional<number>;
  declare dealId: number;
  declare sourceFileId: number;
  declare classificationId: CreationOptional<number | null>;
  declare classificationTaggedBy: CreationOptional<string | null>;
  declare classificationTaggedAt: CreationOptional<Date | null>;
  declare sourceFileVersion: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

DealFile.init(
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
    sourceFileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classificationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    classificationTaggedBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    classificationTaggedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sourceFileVersion: {
      type: DataTypes.INTEGER,
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
    tableName: tableNames.dealFiles,
  },
);

DealFile.belongsTo(Deal, { foreignKey: 'dealId', as: 'deal' });
Deal.hasMany(DealFile, { foreignKey: 'dealId', as: 'files' });

DealFile.belongsTo(SourceDealFile, {
  foreignKey: 'sourceFileId',
  as: 'sourceFile',
});
SourceDealFile.hasMany(DealFile, {
  foreignKey: 'sourceFileId',
  as: 'dealFiles',
});

DealFile.belongsTo(FileClassification, {
  foreignKey: 'classificationId',
  as: 'classification',
});
FileClassification.hasMany(DealFile, {
  foreignKey: 'classificationId',
  as: 'dealFiles',
});

export default DealFile;