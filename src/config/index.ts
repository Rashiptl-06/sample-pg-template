import loggerFactory from "../utils/logging";

const logger = loggerFactory.getLogger('config');

interface IConfig {
  port: number;
  production: boolean;
  pgUrl: string;
  redisUrl: string;
  environment: string;
  keycloakUri: string;
  keycloakClientId: string;
  keycloakClientSecret: string;
  keycloakRealm: string;
}

const getConfig = (): IConfig => {
  if (!process.env.POSTGRES_URL) {
    logger.error('POSTGRES_URL environment variable is required');
    process.exit(1);
  }

  if (!process.env.KEYCLOAK_URI) {
    logger.error('KEYCLOAK_URI environment variable is required');
    process.exit(1);
  }

  if (!process.env.KEYCLOAK_CLIENT_ID) {
    logger.error('KEYCLOAK_CLIENT_ID environment variable is required');
    process.exit(1);
  }

  if (!process.env.KEYCLOAK_CLIENT_SECRET) {
    logger.error('KEYCLOAK_CLIENT_SECRET environment variable is required');
    process.exit(1);
  }

  if (!process.env.KEYCLOAK_REALM) {
    logger.error('KEYCLOAK_REALM environment variable is required');
    process.exit(1);
  }

  return {
    port: Number(process.env.PORT) || 80,
    production: process.env.NODE_ENV === 'production',
    environment: process.env.NODE_ENV || 'localhost',
    pgUrl: process.env.POSTGRES_URL,
    redisUrl: process.env.REDIS_URL || '',

    keycloakUri: process.env.KEYCLOAK_URI,
    keycloakClientId: process.env.KEYCLOAK_CLIENT_ID,
    keycloakClientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
    keycloakRealm: process.env.KEYCLOAK_REALM,
  };
};

const config = getConfig();

export default config;
