import {JsonController, Post, Get, Put, Delete, Body, Param, Authorized} from "routing-controllers";
import Project from "../models/Project";

@JsonController("/projects")
export class ProjectController {
    @Authorized()
    @Post("/")
    async createProject(@Body() projectData: { name: string; description: string }) {
        return await Project.create(projectData);
    }
    @Authorized()
    @Get("/")
    async getProjects() {
        return await Project.findAll();
    }
    @Authorized()
    @Put("/:id")
    async updateProject(@Param("id") id: number, @Body() projectData: { name?: string; description?: string }) {
        const project = await Project.findByPk(id);
        if (!project) throw new Error("Project not found");

        await project.update(projectData);
        return project;
    }
    @Authorized()
    @Delete("/:id")
    async deleteProject(@Param("id") id: number) {
        const project = await Project.findByPk(id);
        if (!project) throw new Error("Project not found");

        await project.destroy();
        return { message: "Project deleted successfully" };
    }
}
