import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "../models/User";
import Task from "../models/Task";
import Project from "../models/Project";

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
    models: [User, Project, Task],
    logging: false,
});

export default sequelize;
