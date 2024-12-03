import { makeAutoObservable } from "mobx";
import { TaskStatuses } from '../types/TaskStatuses';

class ToDoListStore {
    tasks: { id: number, title: string; isCompleted: boolean; status: TaskStatuses }[] = [
        { id: 1, title: "Watch the video", isCompleted: false, status: TaskStatuses.ToDo },
        { id: 2, title: "Visit the granny", isCompleted: false, status: TaskStatuses.ToDo },
        { id: 3, title: "To be a chill guy", isCompleted: false, status: TaskStatuses.ToDo },
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
            this.tasks.push({id: newId, title, isCompleted: false, status: TaskStatuses.ToDo});
        }
    }

    deleteTask(id: number) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

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