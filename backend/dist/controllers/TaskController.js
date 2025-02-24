"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const routing_controllers_1 = require("routing-controllers");
const Task_1 = __importDefault(require("../models/Task"));
const Project_1 = __importDefault(require("../models/Project"));
let TaskController = class TaskController {
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = yield Project_1.default.findByPk(taskData.project_id);
            if (!project)
                throw new Error("Project not found");
            return yield Task_1.default.create(taskData);
        });
    }
    getTasks(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Task_1.default.findAll({ where: { project_id: projectId } });
        });
    }
    updateTask(id, taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield Task_1.default.findByPk(id);
            if (!task)
                throw new Error("Task not found");
            yield task.update(taskData);
            return task;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield Task_1.default.findByPk(id);
            if (!task)
                throw new Error("Task not found");
            yield task.destroy();
            return { message: "Task deleted successfully" };
        });
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Post)("/"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "createTask", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Get)("/project/:projectId"),
    __param(0, (0, routing_controllers_1.Param)("projectId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTasks", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Put)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "updateTask", null);
__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Delete)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "deleteTask", null);
exports.TaskController = TaskController = __decorate([
    (0, routing_controllers_1.JsonController)("/tasks")
], TaskController);
