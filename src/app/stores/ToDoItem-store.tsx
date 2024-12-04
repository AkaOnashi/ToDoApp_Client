import { makeAutoObservable } from "mobx";

class ToDoItemStore {
    
    constructor() {
        makeAutoObservable(this);
    }


}

export default new ToDoItemStore()