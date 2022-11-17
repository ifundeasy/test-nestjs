import { Sequelize } from 'sequelize-typescript';
import { Cat, Food, Eat } from '../cat/cat.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'apaanSih123!',
        database: 'express-services',
      });
      sequelize.addModels([Cat, Food, Eat]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
