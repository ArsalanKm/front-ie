import axios from 'axios';
import { baseURL } from '../../config';
import LocalStorage from '../localStorage';

class Http {
  constructor() {
    this.agent = axios.create({
      baseURL: baseURL,
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000 * 5,
    });
  }

  async sendRequest(url, configs) {
    const { method, body, headers } = configs;
    let defaultHeaders = {};
    if (!headers?.withoutToken) {
      defaultHeaders = {
        authorization: `Bearer_${LocalStorage.getItem('token')}`,
      };
    }

    const config = { headers: { ...headers, ...defaultHeaders } };

    console.log(config);
    let response;
    try {
      switch (method) {
        case 'post':
        case 'put':
          response = await this.agent[method](url, body, config);
          break;
        case 'delete':
          response = await this.agent[method](url, config);
          break;
        case 'get':
        default:
          response = await this.agent.get(url, config);
          break;
      }
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
      };
    }
  }
}

export const http = new Http();
