import { useState, useEffect } from "react";
import axios from "axios";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: "", description: "" });
    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/projects/`);
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects", error);
        }
    };

    const createProject = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/projects/`, newProject);
            setNewProject({ name: "", description: "" });
            fetchProjects();
        } catch (error) {
            console.error("Error creating project", error);
        }
    };

    const updateProject = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_HOST}/projects/${id}`, editingProject);
            setEditingProject(null);
            fetchProjects();
        } catch (error) {
            console.error("Error updating project", error);
        }
    };

    const deleteProject = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_HOST}/projects/${id}`);
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Project Name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="p-2 border rounded mr-2"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    className="p-2 border rounded mr-2"
                />
                <button className="px-3 py-2 bg-stone-900 text-white rounded" onClick={createProject}>
                    Create Project
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="border p-4 rounded shadow">
                        {editingProject?.id === project.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingProject.name}
                                    onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                                    className="p-2 border rounded mb-2 w-full"
                                />
                                <input
                                    type="text"
                                    value={editingProject.description}
                                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                                    className="p-2 border rounded mb-2 w-full"
                                />
                                <button className="px-3 py-1 bg-stone-900 text-white rounded mr-2" onClick={() => updateProject(project.id)}>Save</button>
                                <button className="px-3 py-1 bg-stone-900 text-white rounded" onClick={() => setEditingProject(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-bold">{project.name}</h3>
                                <p>{project.description}</p>
                                <button className="px-3 py-1 bg-stone-900 text-white rounded mr-2" onClick={() => setEditingProject(project)}>Edit</button>
                                <button className="px-3 py-1 bg-stone-900 text-white rounded" onClick={() => deleteProject(project.id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
