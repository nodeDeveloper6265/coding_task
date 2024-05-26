// data-source.ts

import { DataSource } from 'typeorm';
import { User } from './models/User';

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'task',
  entities: [User],
  synchronize: true,
});

export const initializeDataSource = async () => {
  try {
    await dataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
  }
};

export default dataSource;
