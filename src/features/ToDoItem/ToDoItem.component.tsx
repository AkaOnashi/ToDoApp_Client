import React, { useState} from 'react';     
import './ToDoItem.styles.scss';
import { Button,
    message,
    Popconfirm,
    PopconfirmProps,
    Checkbox,
    CheckboxProps,
    Modal,
    Input } from 'antd';
import { observer } from "mobx-react-lite";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskStatuses } from '../../app/types/TaskStatuses';

interface ToDoItemProps {
    id: number;
    title: string; 
    status: TaskStatuses;
    isCompleted: boolean;
    toggleTask: (index: number) => void;
    deleteTask: (index: number) => void; 
    //editTask: (index: number) => void; 
}

const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e);
    message.success('Task was deleted');
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
  };
  
const ToDoItem: React.FC<ToDoItemProps> = ({
    id,
    title,
    status,
    isCompleted,
    toggleTask,
    deleteTask
    }) => {

    const { attributes, listeners, setNodeRef, transform, transition,  } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition || "transform 100ms ease",
    };

    const handleConfirm = () => {
        deleteTask(id); 
        confirm(undefined); 
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <li className="todo-item" ref={setNodeRef} style={style} {...attributes} {...listeners}>

            <Checkbox checked={status === TaskStatuses.Done} onChange={() => toggleTask(id)}></Checkbox>  

            <span className={`task-name ${status === TaskStatuses.Done? 'completed' : ''}`}>{title}</span>
            <span className="status-text">{status}</span>
            
            <Button 
                className="edit-button"
                color="default" 
                variant="filled"
                onClick={showModal}>
                Edit
            </Button>
            
            <Modal title="Edit your task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p className="modal-text">Title</p>
                <Input type="text" value={title}/>
                <p className="modal-text">Description</p>
                <Input type="text"/>
                <p className="modal-text">Status</p>
                <span>ToDo</span>
                <span>In Progres</span>
                <span>Done</span>
            </Modal>
            <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={handleConfirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No">
                    <Button danger className="delete-button">
                        Delete
                    </Button>
            </Popconfirm>
        </li>
    );
}

export default observer(ToDoItem)