import axios from "axios";
import { Task } from "../types/Task.model";
import { mapEnumStatusToBackend, TaskStatuses } from "../types/TaskStatuses";

const instance = axios.create({
    baseURL: 'https://localhost:7106/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchTasks = async () => {
    try {
        const response = await instance.get("/tasks");
        console.log(response);
        return response.data;
    }
    catch(e) {
        console.log(e);
    }
}

export const createTask = async (task: Task) => {
    try {
        const taskToSend = {
            ...task,
            status: mapEnumStatusToBackend(task.status)
        };
        console.log('Task payload being sent:', JSON.stringify(taskToSend, null, 2));

        const response = await instance.post("/tasks", taskToSend)
        console.log('Response from server:', response.data);

        return response.data;
    }
    catch(e) {
        console.log(e);
    }
}

export const updateTaskApi = async (task: Task) => {
    try {
        const taskToSend = {
            ...task,
            status: mapEnumStatusToBackend(task.status)
        };
        console.log('Task payload being sent to update:', JSON.stringify(taskToSend, null, 2));

        const response = await instance.put("/tasks", taskToSend)
        console.log('Response from server:', response.data);

        return response.data;
    }
    catch(e) {
        console.error("Failed to update task", e);
    }
}

export const deleteTaskApi = async (id: number) => {
    try {
        await instance.delete(`/tasks/${id}`)
    }
    catch(e) {
        console.error("Failed to delete task", e);
    }
}