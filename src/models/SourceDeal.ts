import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { PostgresDb } from '../db';

class SourceDeal extends Model<
  InferAttributes<SourceDeal>,
  InferCreationAttributes<SourceDeal>
> {
  declare id: CreationOptional<number>;
  declare repositoryId: number;
  declare dealName: string;
  declare sourcePath: CreationOptional<string | null>;
  declare dealTypeId: CreationOptional<number | null>;
  declare storagePath: string;
  declare active: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

SourceDeal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    repositoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dealName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sourcePath: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    dealTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    storagePath: {
      type: DataTypes.STRING(500),
      allowNull: false,
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
    tableName: 'source_deals',
  },
);

export default SourceDeal;