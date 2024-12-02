import React, { useState} from 'react';     
import './ToDoItem.styles.scss';
import { Button } from "antd";
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';


interface ToDoItemProps {
    task: string; 
    status: string;
    index: number; 
    deleteTask: (index: number) => void; 
    editTask: (index: number) => void; 

    dragStartHandler: (e: React.DragEvent, index: number) => void;
    dragOverHandler: (e: React.DragEvent) => void;
    dragEndHandler: (e: React.DragEvent) => void;
    dropHandler: (e: React.DragEvent, index: number) => void;
}



const ToDoItem: React.FC<ToDoItemProps> = ({task, status, index, deleteTask, 
    editTask, dragStartHandler, dragOverHandler, dragEndHandler, dropHandler}) => {
    
    const [isCompleted, setIsCompleted] = useState(false);
    
    const onChange: CheckboxProps['onChange'] = (e) => {
        setIsCompleted(e.target.checked);
    };

    return (
        <li
            className="todo-item"
            draggable="true"
            onDragStart={(e) => dragStartHandler(e, index)}
            onDragOver={dragOverHandler}
            onDragEnd={dragEndHandler}
            onDrop={(e) => dropHandler(e, index)}>

            <Checkbox checked={isCompleted} onChange={onChange}></Checkbox>  

            <span className={`task-name ${isCompleted ? 'completed' : ''}`}>{task}</span>
            <span className="status-text">ToDo</span>
            
            <Button 
                className="edit-button"
                color="default" 
                variant="filled"
                onClick={() => editTask(index)}>
                Edit
            </Button>
            <Button
                className="delete-button"
                color="danger" 
                variant="solid"
                onClick={() => deleteTask(index)}>
                Delete
            </Button>
            
        </li>

    );
}

export default ToDoItem