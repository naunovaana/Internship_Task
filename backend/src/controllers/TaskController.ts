import {JsonController, Post, Get, Put, Delete, Body, Param, Authorized} from "routing-controllers";
import Task from "../models/Task";
import Project from "../models/Project";

@JsonController("/tasks")
export class TaskController {
    @Authorized()
    @Post("/")
    async createTask(@Body() taskData: { title: string; description: string; due_date: Date; project_id: number }) {
        const project = await Project.findByPk(taskData.project_id);
        if (!project) throw new Error("Project not found");

        return await Task.create(taskData);
    }
    @Authorized()
    @Get("/project/:projectId")
    async getTasks(@Param("projectId") projectId: number) {
        return await Task.findAll({ where: { project_id: projectId } });
    }
    @Authorized()
    @Put("/:id")
    async updateTask(@Param("id") id: number, @Body() taskData: { title?: string; description?: string; due_date?: Date }) {
        const task = await Task.findByPk(id);
        if (!task) throw new Error("Task not found");

        await task.update(taskData);
        return task;
    }
    @Authorized()
    @Delete("/:id")
    async deleteTask(@Param("id") id: number) {
        const task = await Task.findByPk(id);
        if (!task) throw new Error("Task not found");

        await task.destroy();
        return { message: "Task deleted successfully" };
    }
}
