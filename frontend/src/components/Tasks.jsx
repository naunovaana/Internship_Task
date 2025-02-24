import { useState, useEffect } from "react";
import axios from "axios";

export default function Tasks({ selectedProject }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        if (selectedProject) {
            fetchTasks();
        }
    }, [selectedProject]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_HOST}/tasks?projectId=${selectedProject.id}`);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    const createTask = async () => {
        if (!selectedProject) return;
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_HOST}/tasks`, {
                ...newTask,
                projectId: selectedProject.id,
            });
            setNewTask({ title: "", description: "" });
            fetchTasks();
        } catch (error) {
            console.error("Error creating task", error);
        }
    };

    const updateTask = async (id) => {
        try {
            await axios.put(`${import.meta.env.VITE_BACKEND_HOST}/tasks/${id}`, editingTask);
            setEditingTask(null);
            fetchTasks();
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_HOST}/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Tasks</h2>

            {/* Create Task Section - Only visible when a project is selected */}
            {selectedProject && (
                <div className="mb-4 p-4 border rounded shadow">
                    <h3 className="text-lg font-semibold mb-2">Create New Task</h3>
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="p-2 border rounded mr-2 w-full mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="p-2 border rounded mr-2 w-full mb-2"
                    />
                    <button className="px-3 py-2 bg-stone-900 text-white rounded w-full" onClick={createTask}>
                        Create Task
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task) => (
                    <div key={task.id} className="border p-4 rounded shadow">
                        {editingTask?.id === task.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTask.title}
                                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                    className="p-2 border rounded mb-2 w-full"
                                />
                                <input
                                    type="text"
                                    value={editingTask.description}
                                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                    className="p-2 border rounded mb-2 w-full"
                                />
                                <button className="px-3 py-1 bg-stone-900 text-white rounded mr-2" onClick={() => updateTask(task.id)}>Save</button>
                                <button className="px-3 py-1 bg-stone-900 text-white rounded" onClick={() => setEditingTask(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-bold">{task.title}</h3>
                                <p>{task.description}</p>
                                <button className="px-3 py-1 bg-stone-900 text-white rounded mr-2" onClick={() => setEditingTask(task)}>Edit</button>
                                <button className="px-3 py-1 bg-stone-900 text-white rounded" onClick={() => deleteTask(task.id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
