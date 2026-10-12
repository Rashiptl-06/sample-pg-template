  import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  import { PostgresDb } from '../db';
  import { tableNames } from '../repositories/tableNames';

  class FileClassification extends Model<
    InferAttributes<FileClassification>,
    InferCreationAttributes<FileClassification>
  > {
    declare id: CreationOptional<number>;
    declare name: string;
    declare active: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
  }

  FileClassification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
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
      tableName: tableNames.fileClassifications,
    },  
  );

  export default FileClassification;