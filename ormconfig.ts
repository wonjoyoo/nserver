import {ConnectionOptions} from "typeorm";

export default {
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    //timezone: 'Z',
    timezone: '+09:00',
    entities: ['src/entities/**/*.*'],
    migrations: ['src/migrations/**/*.*'],
    seeds: ['src/seeds/**/*.ts'],
    factories: ['src/factories/**/*.ts'],
    //Logging: 'all',
    logging: true
} as ConnectionOptions;
