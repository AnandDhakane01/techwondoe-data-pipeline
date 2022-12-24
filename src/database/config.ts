import { DataSourceOptions } from "typeorm";

const port = parseInt(process.env.DB_PORT || "5432");

const config: DataSourceOptions = {
  type: "postgres",
  port: port,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
};

export default config;
