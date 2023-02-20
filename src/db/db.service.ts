import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DataSource } from 'typeorm';
import { config } from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const dbService = new DataSource({
  type: 'postgres',
  host: config.PG_HOST,
  port: config.PG_PORT,
  username: config.PG_USER,
  password: config.PG_PASS,
  database: config.PG_NAME,
  entities: [join(__dirname, '../api/**/*.entity.{ts,js}')],
  synchronize: true,
  logging: false,
});
export type DBService = typeof dbService;
