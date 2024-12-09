import { makeAutoObservable, runInAction  } from "mobx";
import { TaskStatuses, mapBackendStatusToEnum } from '../types/TaskStatuses';
import { getTasks, createTask, deleteTaskApi, updateTaskApi, getTasksByStatus } from '../../app/api/task.api';
import { Task } from "../types/Task.model";

class ToDoListStore {
    tasks: Task[] = [];

    isLoading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async loadTasks(status: number) {
        this.isLoading = true;
        this.error = null;
        let tasks;

        try {
            if(status === 3) {
                tasks = await getTasks();
            } 
            else {
                tasks = await getTasksByStatus(status);
            }

            this.tasks = tasks.map((task: any) => ({
                ...task,
                status: mapBackendStatusToEnum(task.status)
            }));
            
        } catch (error) {
          this.error = "Failed to load tasks";
          console.error(error);
        } finally {
          this.isLoading = false;
        }
    }

    async addTask(task: Partial<Task>) {
        const newTask: Task = {
            id: 0,
            title: task.title || "New Task",
            description: task.description || "",
            status: task.status || TaskStatuses.ToDo,
        };

        try {
            const createdTask: Task = await createTask(newTask);
            newTask.id = createdTask.id;
            runInAction(() => {
                this.tasks.push(newTask);
            })
            
            console.log(newTask.id);
            
          } catch (error) {
            this.error = "Failed to create a task";
            console.error(error);
          }
    }

    handleStatusCompleted () {

    }

    async deleteTask(id: number) {
        try {
            this.tasks = this.tasks.filter(task => task.id !== id);
            await deleteTaskApi(id);
        }
        catch(e) {
            console.error("Failed to delete task");
        }
    }

    async updateTask(id: number, newTitle: string, newDescription: string, newStatus: TaskStatuses) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.title = newTitle;
            task.status = newStatus;
            task.description = newDescription;

            await updateTaskApi(task);
        }
    };

    async toggleTask(id: number) {
        const task = this.tasks.find(task => task.id === id);
        if(task){
            task.status = task.status === TaskStatuses.Done 
            ? TaskStatuses.ToDo 
            : TaskStatuses.Done;
            await updateTaskApi(task);
        }
    }
}

export default new ToDoListStore()
