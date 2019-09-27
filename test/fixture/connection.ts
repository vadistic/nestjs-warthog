import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import dotenv from 'dotenv'

dotenv.config()

export const CONFIG = {
  DB_TYPE: 'postgres',
  DB_HOST: process.env.PGHOST || 'localhost',
  DB_PORT: process.env.PGPORT ? +process.env.PGPORT : 5432,
  DB_USERNAME: process.env.PGUSER || 'root',
  DB_PASSWORD: process.env.PGPASSWORD || 'root',
  DB_NAME: process.env.PGDATABASE || 'test',
  DB_SCHEMA: process.env.PGSCHEMA || 'public',
}

export const typeOrmOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: CONFIG.DB_HOST,
  port: CONFIG.DB_PORT,
  username: CONFIG.DB_USERNAME,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_NAME,
  schema: CONFIG.DB_SCHEMA,
  synchronize: false,
  // ssl needed for heroku
  ssl: true,
}
