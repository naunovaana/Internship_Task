import "reflect-metadata"; // Required for routing-controllers
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import sequelize from "./config/database";
import { useExpressServer } from "routing-controllers";
import { UserController } from "./controllers/UserController";
import { ProjectController } from "./controllers/ProjectController";
import { TaskController } from "./controllers/TaskController";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

useExpressServer(app, {
    controllers: [UserController, ProjectController, TaskController],
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(` Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Sequelize sync error:", err);
    });
