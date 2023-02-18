import 'dotenv/config';

enum ENV {
  APP_PORT = 'APP_PORT',
  PG_NAME = 'PG_NAME',
  PG_USER = 'PG_USER',
  PG_PASS = 'PG_PASS',
  PG_HOST = 'PG_HOST',
  PG_PORT = 'PG_PORT',
}

const checkEnv = (env: string): string => {
  const envValue = process.env[env];
  if (envValue === undefined) {
    throw new Error(`Check that '${env}' really exist in your .env file`);
  }
  return envValue;
};

export const config = {
  APP_PORT: parseInt(checkEnv(ENV.APP_PORT), 10) || 8088,
  PG_NAME: checkEnv(ENV.PG_NAME),
  PG_USER: checkEnv(ENV.PG_USER),
  PG_PASS: checkEnv(ENV.PG_PASS),
  PG_HOST: checkEnv(ENV.PG_HOST),
  PG_PORT: parseInt(checkEnv(ENV.PG_PORT), 10),
  PG_URL: '',
};
config.PG_URL = `postgresql://${config.PG_USER}:${config.PG_PASS}@${config.PG_HOST}:${config.PG_PORT}/${config.PG_NAME}`;
export type Config = typeof config;
