import React, { useState} from 'react';
import './ToDoList.styles.scss';
import ToDoItem from '../ToDoItem/ToDoItem.component';
import { Button } from "antd";
import { Input } from 'antd';

function ToDoList() {
    const [tasks, setTasks] = useState(["Watch the video", "Visit the granny"]);
    const[newTask, setNewTask] = useState("");
    const [status, setNewStatus] = useState("ToDo");

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
            </div>
            <ol>
                {tasks.map((task, index) => 
                    <ToDoItem 
                        key={index}
                        task={task}
                        status={status}
                        index={index}
                        deleteTask={deleteTask}
                        editTask={editTask} />
                )}
            </ol>
        </div>);
}

export default ToDoList