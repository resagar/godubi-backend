export default () => ({
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
    synchronize: false,
    migrations: [`${__dirname}/migrations/*.migration{.ts,.js}`],
    migrationsTableName: 'typeorm_migrations',
    cli: {
      migrationsDir: `${__dirname}/migrations`,
    },
  },
});
