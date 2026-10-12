import axios from 'axios';
import loggerFactory from './logging';

const logger = loggerFactory.getLogger('RequestHelper');

export default class RequestHelper {
  async get<T>(url: string, accessToken?: string) {
    logger.info(`Hitting get with ${url}`);
    const headerBody = {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    };
    const response = await axios.get<T>(url, { headers: headerBody, timeout: 1500000 });
    return response.data;
  }

  async post<T, B>(url: string, data: B, accessToken?: string) {
    logger.info(`Hitting post with ${url}`);
    const headerBody = {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    };
    const response = await axios.post<T>(url, data, { headers: headerBody, timeout: 1500000 });
    return response.data;
  }

  async put<T, B>(url: string, data: B, accessToken?: string) {
    logger.info(`Hitting put with ${url}`);
    const headerBody = {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    };
    const response = await axios.put<T>(url, data, { headers: headerBody, timeout: 1500000 });
    return response.data;
  }

  async delete<T>(url: string, accessToken?: string) {
    logger.info(`Hitting delete with ${url}`);
    const headerBody = {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    };
    const response = await axios.delete<T>(url, { headers: headerBody, timeout: 1500000 });
    return response.data;
  }
}
