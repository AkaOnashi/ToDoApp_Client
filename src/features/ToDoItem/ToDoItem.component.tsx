import './ToDoItem.styles.scss';
import { Button } from "antd";

interface ToDoItemProps {
    task: string; 
    status: string;
    index: number; 
    deleteTask: (index: number) => void; 
    editTask: (index: number) => void; 
}

const ToDoItem: React.FC<ToDoItemProps> = ({task, status, index, deleteTask, editTask}) => {
    return (
        <li>
            <span className="task-name">{task}</span>
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