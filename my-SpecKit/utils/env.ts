import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

export const env = {
  BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com',
  SAUCEDEMO_USER: process.env.SAUCEDEMO_USER || '',
  SAUCEDEMO_PASSWORD: process.env.SAUCEDEMO_PASSWORD || '',
  REQRES_BASE_URL: process.env.REQRES_BASE_URL || 'https://reqres.in',
};

if (!env.SAUCEDEMO_USER || !env.SAUCEDEMO_PASSWORD) {
  console.warn('Warning: SAUCEDEMO_USER or SAUCEDEMO_PASSWORD is not set in .env');
}
