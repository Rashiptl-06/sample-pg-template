import axios from 'axios';
import loggerFactory from './logging';

const logger = loggerFactory.getLogger('Http');

class Http {
  async post<T, B>(url: string, data: B, authToken?: string) {
    try {
      logger.info(`Hitting remote service `, url);
      const response = await axios.post<T>(url, data, {
        headers: { ...(authToken ? { Authorization: authToken } : {}) },
      });
      return response.data;
    } catch (error) {
      const _error = <Error>error;
      throw new Error(_error.message);
    }
  }

  async postFormData<T>(url: string, data: FormData, authToken?: string) {
    try {
      logger.info(`Hitting remote service (form-data) `, url);
      const response = await axios.post<T>(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          ...(authToken ? { Authorization: authToken } : {}),
        },
      });
      return response.data;
    } catch (error) {
      const _error = <Error>error;
      throw new Error(_error.message);
    }
  }

  async get<T>(url: string, authToken?: string) {
    try {
      logger.info(`Hitting remote service `, url);
      const response = await axios.get<T>(url, {
        headers: { ...(authToken ? { Authorization: authToken } : {}) },
      });
      return response.data;
    } catch (error) {
      const _error = <Error>error;
      throw new Error(_error.message);
    }
  }
}

export default Http;
