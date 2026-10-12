import log4js, { Configuration } from 'log4js';
import asyncLocalStorage from './asyncContext';

const { configure } = log4js;
const loggerFactory = log4js;

const loggerConfig: Configuration = process.env.LOGGER_CONFIG
  ? (JSON.parse(process.env.LOGGER_CONFIG) as Configuration)
  : {
      disableClustering: true,
      appenders: {
        out: {
          type: 'stdout',
          layout: {
            type: 'pattern',
            pattern: '%[ [%d] [%p] %] %c - %x{requestId} - %m',
            tokens: {
              requestId: () => {
                const store = asyncLocalStorage.getStore();
                return store ? store.get('requestId') : 'unknown';
              },
            },
          },
        },
      },
      categories: {
        default: { appenders: ['out'], level: process.env.NODE_ENV === 'test' ? 'error' : 'trace' },
      },
    };

configure(loggerConfig);
export default loggerFactory;
