import { Sequelize } from 'sequelize';
import config from '../config';
import loggerFactory from '../utils/logging';

const logger = loggerFactory.getLogger('Database');

class Database {
  static instance: Database;

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public sequelize: Sequelize = new Sequelize(config.pgUrl);

  async connectToDatabase() {
    await this.sequelize
      .authenticate()
      .then(() => {
        logger.info('Connection has been established successfully.');
      })
      .catch((err) => {
        logger.error('Unable to connect to the Database:', err);
      });
  }
}

export default Database.getInstance();
