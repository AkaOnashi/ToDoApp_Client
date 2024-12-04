import { makeAutoObservable } from "mobx";
import { TaskStatuses } from '../types/TaskStatuses';

class ToDoListStore {
    tasks: { id: number, description: string , title: string; status: TaskStatuses }[] = [
        { id: 1, description: "", title: "Watch the video", status: TaskStatuses.ToDo },
        { id: 2, description: "Apple street, house 21" ,title: "Visit the granny", status: TaskStatuses.InProgress },
        { id: 3, description: "", title: "To be a chill guy", status: TaskStatuses.Done },
    ];

    constructor() {
        makeAutoObservable(this);
    }

    handleStatusCompleted () {

    }

    addTask(title: string) {
        const newId = this.tasks.length > 0 ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        console.log("newId: " + newId);
        if (title.trim() !== "") {
            this.tasks.push({id: newId, title, description: "", status: TaskStatuses.ToDo});
        }
    }

    deleteTask(id: number) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTask(id: number, newTitle: string, newDescription: string, newStatus: TaskStatuses) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.title = newTitle;
            task.status = newStatus;
            task.description = newDescription;
        }
    };

    toggleTask(id: number) {
        const task = this.tasks.find(task => task.id === id);
        if(task){
            task.status = task.status === TaskStatuses.Done 
            ? TaskStatuses.ToDo 
            : TaskStatuses.Done;
        }
    }
}

export default new ToDoListStore()