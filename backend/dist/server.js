"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // Required for routing-controllers
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = __importDefault(require("./config/database"));
const routing_controllers_1 = require("routing-controllers");
const UserController_1 = require("./controllers/UserController");
const ProjectController_1 = require("./controllers/ProjectController");
const TaskController_1 = require("./controllers/TaskController");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
(0, routing_controllers_1.useExpressServer)(app, {
    controllers: [UserController_1.UserController, ProjectController_1.ProjectController, TaskController_1.TaskController],
});
database_1.default.sync({ alter: true })
    .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log(` Server is running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Sequelize sync error:", err);
});
