import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DataSource } from 'typeorm';
import { config } from './config.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);

export const dbService = new DataSource({
  type: 'postgres',
  host: 'univ-db',
  port: config.PG_PORT,
  username: config.PG_USER,
  password: config.PG_PASS,
  database: config.PG_NAME,
  entities: [join(__dirname, './**/*.entity.ts')],
  synchronize: true,
  logging: false,
});
export type DBService = typeof dbService;
