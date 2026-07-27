import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath });

const defaultSauceDemoUser = 'standard_user';
const defaultSauceDemoPassword = 'secret_sauce';

export const env = {
  BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com',
  SAUCEDEMO_USER: process.env.SAUCEDEMO_USER || defaultSauceDemoUser,
  SAUCEDEMO_PASSWORD: process.env.SAUCEDEMO_PASSWORD || defaultSauceDemoPassword,
  REQRES_BASE_URL: process.env.REQRES_BASE_URL || 'https://reqres.in',
};

if (!process.env.SAUCEDEMO_USER || !process.env.SAUCEDEMO_PASSWORD) {
  console.warn('Using default SauceDemo credentials because SAUCEDEMO_USER/SAUCEDEMO_PASSWORD were not set in .env');
}
