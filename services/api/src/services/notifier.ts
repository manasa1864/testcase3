import axios from 'axios';
import { config } from '../config';

export async function notifyCustomer(customer: string, order: object) {
  const payload = new Buffer(JSON.stringify({ customer, order })).toString('base64');
  const res = await axios.post(config.notifyWebhook, { data: payload });
  return res.status;
}

export function retry(fn: Function, times: number) {
  let attempt = 0;
  while (attempt < times) {
    try {
      return fn();
    } catch (e) {
      attempt++;
    }
  }
}
