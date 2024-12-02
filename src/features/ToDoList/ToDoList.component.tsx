import React, { useState} from 'react';
import './ToDoList.styles.scss';
import ToDoItem from '../ToDoItem/ToDoItem.component';
import { Button } from "antd";
import { Input } from 'antd';
import FilterDropdown from '../../app/components/FilterDropdown/FilterDropdown.component';


function ToDoList() {
    const [tasks, setTasks] = useState(["Watch the video", "Visit the granny", "To be a chill guy"]);
    const[newTask, setNewTask] = useState("");
    const [status, setNewStatus] = useState("ToDo");
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    function handleInputChange(event:  React.ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if(newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            setNewTask("");          
        }
        
    }

    function deleteTask(index: number) {
        const updatedTask = tasks.filter((_, i) => i !== index);
        setTasks(updatedTask);
    }

    function editTask(index: number) {

    }

    function dragStartHandler(e: React.DragEvent, index: number) {
        setDraggedIndex(index);
    }

    function dragOverHandler(e: React.DragEvent) {
        e.preventDefault();  
    }

    function dragEndHandler(e: React.DragEvent) {
        setDraggedIndex(null);  
    }

    function dropHandler(e: React.DragEvent, index: number) {
        e.preventDefault();
        if (draggedIndex !== null) {
            const updatedTasks = [...tasks];
            const draggedTask = updatedTasks[draggedIndex];
            updatedTasks.splice(draggedIndex, 1);
            updatedTasks.splice(index, 0, draggedTask);  
            setTasks(updatedTasks);  
        }
    }

    return(
        <div>
            <div className="input-box">
            <Input
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={handleInputChange} />

            <Button
                className="addtask-button"
                type="primary"
                onClick={addTask}>
                Add Task        
            </Button>
            <span className="filter-button">
                <FilterDropdown/>
            </span>
            
            </div>

            

            <ol>
                {tasks.map((task, index) => 
                    <ToDoItem 
                        key={index}
                        task={task}
                        status={status}
                        index={index}
                        deleteTask={deleteTask}
                        editTask={editTask}
                        
                        dragStartHandler={dragStartHandler}
                        dragOverHandler={dragOverHandler}
                        dragEndHandler={dragEndHandler}
                        dropHandler={dropHandler}/>
                )}
            </ol>
        </div>);
}

export default ToDoList