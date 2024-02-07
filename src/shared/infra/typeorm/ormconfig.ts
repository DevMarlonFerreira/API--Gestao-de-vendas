import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: ['./src/shared/typeorm/migrations/*.ts'],
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  // entities: ['./dist/modules/**/typeorm/entities/*.ts'],
  // migrations: ['./dist/shared/typeorm/migrations/*.ts'],
  // cli: {
  //   migrationsDir: './dist/shared/typeorm/migrations',
  // },
});
