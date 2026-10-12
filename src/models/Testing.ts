import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { PostgresDb } from '../db';
import { tableNames } from '../repositories/tableNames';

class Testing extends Model<InferAttributes<Testing>, InferCreationAttributes<Testing>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Testing.init(
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
  },
  {
    sequelize: PostgresDb.sequelize,
    timestamps: true,
    tableName: tableNames.testing,
  },
);

export default Testing;
